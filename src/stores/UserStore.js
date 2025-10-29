import { makeObservable, observable, action, flow } from 'mobx';
import { GenericStore } from './GenericStore';
import { GET_USER_PROFILE_QUERY } from '/src/graphql/graphql-schema.js'; // Host query

class UserStore extends GenericStore {
  user = null; // Will hold user data like { name: 'Alice' }
  isLoggedIn = false;

  constructor() {
    super();
    makeObservable(this, {
      user: observable,
      isLoggedIn: observable,
      login: action,
      logout: action,
      fetchUserProfile: flow
    });
  }

  *fetchUserProfile(userId) {
    this.status = 'loading';
    try {
      // 3. Use the injected service!
      const { data } = yield this.graphqlMethods.doQuery(
        GET_USER_PROFILE_QUERY, 
        { userId }
      );
      
      this.user = data.user; // Update state
      this.status = 'done';
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      this.status = 'error';
    }
  }

  login(userName) {
    // A real login would be a 'flow' that calls a mutation
    this.user = { name: userName, token: 'fake-token-123' }; // Simplified
    this.isLoggedIn = true;
    // this.fetchUserProfile('user-1'); // We could auto-fetch profile
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
  }
}

// Export a single instance for the whole app
export const userStore = new UserStore();