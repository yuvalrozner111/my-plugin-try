import { makeObservable, observable, action, flow } from 'mobx';
import { GenericStore } from '/src/stores/GenericStore';
import { GET_COUNTRY_QUERY } from './graphql/graphql-schema';

export class ByeByeStore extends GenericStore {
  // store the fields returned by the GraphQL schema
  country = { name: '', capital: '', currency: '' };
  backendMessage = '';

  constructor() {
    super();
    makeObservable(this, {
      country: observable,
      backendMessage: observable,
      setCountry: action,
      fetchCountry: flow,
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
}
