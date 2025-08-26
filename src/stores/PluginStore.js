import { makeObservable, observable, action } from 'mobx';

class PluginStore {
  stores = {};

  constructor() {
    makeObservable(this, {
      stores: observable,
      registerStore: action,
    });
  }

  registerStore(name, store) {
    this.stores[name] = store;
  }

  getStore(name) {
    return this.stores[name];
  }
}

export const pluginStore = new PluginStore();
