import { makeObservable, observable, action } from 'mobx';
import { GenericStore } from './GenericStore';

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
    });
  }

  login(userName) {
    this.user = { name: userName };
    this.isLoggedIn = true;
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
  }
}

// Export a single instance for the whole app
export const userStore = new UserStore();