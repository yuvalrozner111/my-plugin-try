import { makeObservable, observable, action, flow } from 'mobx';
import { GenericStore } from '/src/stores/GenericStore';
import { EXAMPLE_QUERY } from './graphql/graphql-schema';

/**
 * This is the custom store for the "FailExample" plugin. It manages the state specific to that plugin.
 */
export class FailExampleStore extends GenericStore { // inherits from GenericStore.
  exampleValue = 99999;
  backendMessage = '';

  constructor() {
    super();
    makeObservable(this, {
      exampleValue: observable,
      setExampleValue: action,
      backendMessage: observable,
      fetchExampleData: flow,
    });

    this.fetchExampleData = this.fetchExampleData.bind(this);
  }

  setExampleValue(value) {
    this.exampleValue = value;
  }

  *fetchExampleData() {
    if (!this.graphqlMethods) {
      console.warn('Network service not yet injected into TemplatePluginStore.');
      return;
    }
    this.backendMessage = 'Loading...';
    try {
      const response = yield this.graphqlMethods.doQuery(EXAMPLE_QUERY, {});
      this.backendMessage = response.data.getExample;
    } catch (error) {
      console.error('Error fetching example data:', error);
    }
  }
};
