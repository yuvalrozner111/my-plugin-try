import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  concat,
  InMemoryCache,
  fromPromise
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// A "black box" to hold our stores.
// The client doesn't know *what* they are, just that it can get them.
const storeRegistry = {
  userStore: null,
  // We can add other stores here if needed for headers, like authStore
};

// 1. Auth/Header Middleware (from your graphql-client.js)
const authMiddleware = new ApolloLink((operation, forward) => {
  const { userStore } = storeRegistry;

  // Dynamically get user data for headers
  const token = userStore?.user?.token; // Assuming token is on userStore.user
  const roleType = userStore?.user?.role?.key;
  const exerciseId = userStore?.user?.exercise?.id;

  operation.setContext({
    headers: {
      ...operation.getContext().headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(roleType && { roleType }),
      ...(exerciseId && { exerciseId }),
      'Cache-Control': localStorage.getItem('Cache-Control') || 'no-cache',
    },
  });

  return forward(operation);
});

// 2. Error Handling Link (from your graphql-client.js)
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}`,
      );
      // We can use a global event bus or toast manager here
      // notification.warning({ message });
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);

    // 3. Token Refresh Logic (from your graphql-client.js)
    if (networkError.statusCode === 401) {
      const { userStore } = storeRegistry;
      
      // Check if we have a refresh mechanism
      if (userStore && typeof userStore.refreshToken === 'function') {
        // Use fromPromise to wait for the refresh and retry
        return fromPromise(
          userStore.refreshToken().catch(error => {
            // Refresh failed, logout
            console.error("Token refresh failed", error);
            userStore.logout();
            return Promise.reject(error);
          })
        ).flatMap(() => forward(operation));
      } else {
        // No refresh function, just log out
        userStore?.logout();
      }
    }
  }
});

/**
 * Creates the central Apollo Client instance.
 */
export const createApolloClient = () => {
  const httpLink = new HttpLink({
    // Prefer VITE_GRAPHQL_URL, fall back to legacy VITE_GRAPHQL_ENDPOINT, then localhost default
    uri: import.meta.env.VITE_GRAPHQL_URL || import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:7000/graphql',
    headers: { 'content-type': 'application/json' },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([
      errorLink,
      authMiddleware,
      httpLink,
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: 'no-cache' },
      query: { fetchPolicy: 'no-cache' },
      mutate: { fetchPolicy: 'no-cache' },
    },
  });

  /**
   * Injects stores into the client's link middleware.
   * This is called once at app startup.
   */
  client.setStores = (stores) => {
    storeRegistry.userStore = stores.userStore;
    // ... register other stores if needed
  };

  return client;
};