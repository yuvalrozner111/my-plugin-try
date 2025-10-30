import { makeObservable, observable, action, flow } from 'mobx';
import { GenericStore } from '/src/stores/GenericStore';
import { GET_HELLO_GREETING_QUERY } from './graphql/graphql-schema';
import { HELLO_EVENTS } from './constants/internal';

export class HelloStore extends GenericStore { // inherits from GenericStore.
  name = 'World';
  backendMessage = '';

  constructor() {
    super();
    makeObservable(this, {
      name: observable,
      backendMessage: observable,
      setName: action,
      fetchGreeting: flow,
    });

    this.fetchGreeting = this.fetchGreeting.bind(this);
  }

  setName(name) {
    this.name = name;
    
    // We can auto-fetch when name changes
    this.fetchGreeting(); 
    
    // --- EMIT THE EVENT ---
    // Check if the bus is available (it will be)
    if (this.eventBus) {
      console.log('HelloStore emitting event:', HELLO_EVENTS.NAME_CHANGED);
      this.eventBus.emit(HELLO_EVENTS.NAME_CHANGED, { newName: name });
    }
  }

  *fetchGreeting() {
    if (!this.graphqlMethods) {
      console.warn('Network service not yet injected into HelloStore.');
      return;
    }
    this.backendMessage = 'Loading...';
    try {
      const { data } = yield this.graphqlMethods.doQuery(
        GET_HELLO_GREETING_QUERY,
        { name: this.name }
      );
      this.backendMessage = data.helloGreeting.message;
    } catch (error) {
      console.error('HelloStore failed to fetch greeting:', error);
      this.backendMessage = 'Error loading greeting.';
    }
  }
}
