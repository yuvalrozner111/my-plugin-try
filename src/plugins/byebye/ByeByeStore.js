import { makeObservable, observable, action, flow } from 'mobx';
import { GenericStore } from '/src/stores/GenericStore';
import { GET_COUNTRY_QUERY } from './graphql/graphql-schema';
import { HELLO_EVENTS } from './constants/internal';

export class ByeByeStore extends GenericStore {
  // store the fields returned by the GraphQL schema
  country = { name: '', capital: '', currency: '' };
  backendMessage = '';
  helloEventMessage = 'Waiting for hello event...';
  subscribedToHello = false; // track whether we've subscribed

  constructor() {
    super();
    makeObservable(this, {
      country: observable,
      backendMessage: observable,
      helloEventMessage: observable,
      subscribedToHello: observable,
      setCountry: action,
      fetchCountry: flow,
      handleHelloNameChange: action,
      subscribeToHelloEvents: action,
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
   * We override setEventBus to store the bus but do NOT auto-subscribe.
   * Subscription now happens only when subscribeToHelloEvents() is called.
   */
  setEventBus(bus) {
    super.setEventBus(bus); // This sets 'this.eventBus'
    console.log('ByeByeStore received event bus (will not auto-subscribe).');
    // do NOT call this.eventBus.on(...) here anymore
  }

  /**
   * Subscribe to hello plugin events on demand.
   * Calling multiple times is safe (only subscribes once).
   */
  subscribeToHelloEvents() {
    if (this.subscribedToHello) return;
    if (!this.eventBus) {
      console.warn('Event bus not yet available to ByeByeStore.');
      return;
    }
    this.eventBus.on(HELLO_EVENTS.NAME_CHANGED, this.handleHelloNameChange);
    this.subscribedToHello = true;
    console.log('ByeByeStore subscribed to', HELLO_EVENTS.NAME_CHANGED);
  }

  handleHelloNameChange = (payload) => {
    console.log('ByeByeStore received event with payload:', payload);
    this.helloEventMessage = `Heard hello's name changed to: ${payload.newName}`;
  }
}
