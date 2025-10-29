import { createApolloClient } from '/src/config/apollo-client.js';

// 1. Create the single client instance
export const client = createApolloClient();

// 2. Create the graphqlMethods wrapper (from your index.js)
export const graphqlMethods = {
  /**
   * @param {DocumentNode} query - The GraphQL query (e.g., from gql`...`)
   */
  doQuery: (query, variables = {}, options = { fetchPolicy: 'no-cache' }) => {
    // Logic for cache control from your example
    const operationName = query.definitions.find(def => def.kind === 'OperationDefinition')?.name?.value;
    const queriesForCaching = ['getSystemEnumerationTreeUpdates', 'getUpdatedMapLayers']; // Example

    if (queriesForCaching.includes(operationName)) {
      localStorage.setItem('Cache-Control', '');
    } else {
      localStorage.setItem('Cache-Control', 'no-cache');
    }
    
    return client.query({ query, variables, ...options });
  },

  /**
   * @param {DocumentNode} mutation - The GraphQL mutation (e.g., from gql`...`)
   */
  doMutation: (mutation, variables = {}, update = () => {}) => {
    localStorage.setItem('Cache-Control', 'no-cache');
    return client.mutate({ mutation, variables, update });
  },
  
  /**
   * @param {DocumentNode} subscription - The GraphQL subscription
   */
  doSubscription: (subscription, variables = {}) => {
    return client.subscribe({ query: subscription, variables });
  },
};