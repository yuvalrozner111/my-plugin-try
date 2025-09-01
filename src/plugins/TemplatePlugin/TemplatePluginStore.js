import { makeObservable, observable, action } from 'mobx';
import { GenericStore } from '../../stores/GenericStore';

/**
 * This is the custom store for the "TemplatePlugin" plugin. It manages the state specific to that plugin.
 */
export class TemplatePluginStore extends GenericStore { // inherits from GenericStore.
  exampleValue = 99999;

  constructor() {
    super();
    makeObservable(this, {
      exampleValue: observable,
      setExampleValue: action,
    });
  }

  setExampleValue(value) {
    this.exampleValue = value;
  }
}
