import { makeObservable, observable, action, flow } from 'mobx';
import { GenericStore } from '/src/stores/GenericStore';
import { GET_COUNTRY_QUERY } from './graphql/graphql-schema';
import { HELLO_EVENTS } from './constants/internal';

export class ByeByeStore extends GenericStore {
  // store the fields returned by the GraphQL schema
  country = { name: '', capital: '', currency: '' };
  backendMessage = '';
  helloEventMessage = 'Waiting for hello event...';

  constructor() {
    super();
    makeObservable(this, {
      country: observable,
      backendMessage: observable,
      setCountry: action,
      fetchCountry: flow,
      handleHelloNameChange: action,
    });
  }

  setCountry(payload) {
    this.country = payload || { name: '', capital: '', currency: '' };
  }

  // fetchCountry accepts an optional code param (defaults to this.name)
  *fetchCountry(code = this.name) {
    if (!this.graphqlMethods) {
      console.warn('Network service not yet injected into ByeByeStore.');
      return null;
    }

    this.backendMessage = 'Loading...';
    try {
      const { data } = yield this.graphqlMethods.doQuery(
        GET_COUNTRY_QUERY,
        { code }
      );

      if (data && data.country) {
        const { name, capital, currency } = data.country;
        this.setCountry({ name, capital, currency });
        this.backendMessage = '';
        return data.country;
      } else {
        this.backendMessage = 'No country data.';
        this.setCountry(null);
        return null;
      }
    } catch (error) {
      console.error('ByeByeStore failed to fetch country:', error);
      this.backendMessage = 'Error loading country.';
      this.setCountry(null);
      return null;
    }
  }

  /**
   * We override setEventBus to subscribe to events when the bus is injected.
   */
  setEventBus(bus) {
    super.setEventBus(bus); // This sets 'this.eventBus'
    
    console.log('ByeByeStore subscribing to event:', HELLO_EVENTS.NAME_CHANGED);
    
    // Subscribe to the event from the 'hello' plugin
    this.eventBus.on(
      HELLO_EVENTS.NAME_CHANGED,
      this.handleHelloNameChange
    );
    
    // It's good practice to have a cleanup method,
    // but for stores with app-long lifecycles, it's less critical.
  }

  handleHelloNameChange = (payload) => {
    console.log('ByeByeStore received event with payload:', payload);
    this.helloEventMessage = `Heard hello's name changed to: ${payload.newName}`;
  }
}
