import { makeObservable, observable, action } from 'mobx';

/**
 * PluginStore Class: This class is designed to hold and manage all other stores.
 */
class PluginStore {
  stores = {}; // An observable object to hold all plugin-specific stores
  graphqlMethods = null; // property to hold the service reference
  notificationService = null; // property to hold notification 'api' object

  constructor() {
    makeObservable(this, {
      stores: observable,
      registerStore: action,
    });
  }

  // Method to set the network service reference
  setNetworkService(service) {
    this.graphqlMethods = service;
    
    // Also inject it into any stores that were already registered
    Object.values(this.stores).forEach(store => {
      if (store.setNetworkService) {
        store.setNetworkService(service);
      }
    });
  }

  // This method will be called by AppWrapper
  setNotificationService(service) {
    this.notificationService = service;
    // Propagate to all existing stores
    Object.values(this.stores).forEach(store => {
      if (store.setNotificationService) {
        store.setNotificationService(service);
      }
    });
  }

  // Method to add a new plugin's store
  registerStore(pluginId, store) {
    // Auto-inject the service when a new store is registered
    if (this.graphqlMethods && store.setNetworkService) {
      store.setNetworkService(this.graphqlMethods);
    }
    // Auto-inject notification service if it's already available
    if (this.notificationService && store.setNotificationService) {
      store.setNotificationService(this.notificationService);
    }
    this.stores[pluginId] = store;
  }

  // Method to retrieve a specific plugin's store
  getStore(pluginId) {
    return this.stores[pluginId];
  }
}

export const pluginStore = new PluginStore();
