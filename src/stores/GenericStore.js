import { makeObservable, observable, action } from 'mobx';

/**
 * This is a base class that other plugin stores can extend. It provides some common functionality.
 * 
 * Its main purpose is to establish a pattern for how stores should be created,
 *   ensuring they are properly set up with MobX observables and actions.
 */


/**
 * @class GenericStore
 * @description
 * Serves as a base class for all plugin-specific and host stores. It provides a
 * consistent structure and can be used to define shared state and actions.
 *
 * It can be used like a base class or an "interface" in OOP:
 * 1. **Inheritance**: Subclasses inherit observables (e.g., `status`) and actions
 * (e.g., `reset`) which they can use directly or override.
 * 2. **Interface Simulation**: By defining a method that throws an error (e.g., `save`),
 * it enforces a contract that subclasses must implement that method, otherwise a
 * runtime error will occur.
 *
 * @example
 * // In a plugin's store:
 * class MyPluginStore extends GenericStore {
 * reset() {
 * super.reset(); // Optionally call parent logic
 * // Add custom reset logic here...
 * }
 *
 * save() {
 * // Custom save logic for this plugin...
 * }
 * }
 */
export class GenericStore {
  data = {};
  status = 'idle';

  constructor() {
    makeObservable(this, {
      data: observable,
      status: observable,
      setData: action,
      reset: action,
    });
  }

  setData(data) {
    this.data = { ...this.data, ...data };
  }

  reset() {
    this.status = 'idle';
  }

  /**
   * This method is intended to be overridden by subclasses.
   * It simulates a required interface method by throwing an error if not implemented.
   */
  save() {
    throw new Error(`The "save()" method must be implemented by the subclassing store.`);
  }
}