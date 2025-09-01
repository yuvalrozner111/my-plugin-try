import { makeObservable, observable, action } from 'mobx';

/**
 * PluginStore Class: This class is designed to hold and manage all other stores.
 */
class PluginStore {
  stores = {}; // An observable object to hold all plugin-specific stores

  constructor() {
    makeObservable(this, {
      stores: observable,
      registerStore: action,
    });
  }

  // Method to add a new plugin's store
  registerStore(pluginId, store) {
    this.stores[pluginId] = store;
  }

  // Method to retrieve a specific plugin's store
  getStore(pluginId) {
    return this.stores[pluginId];
  }
}

export const pluginStore = new PluginStore();
