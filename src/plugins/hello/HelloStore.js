import { makeObservable, observable, action } from 'mobx';
import { GenericStore } from '../../stores/GenericStore';

export class HelloStore extends GenericStore {
  name = 'World';

  constructor() {
    super();
    makeObservable(this, {
      name: observable,
      setName: action,
    });
  }

  setName(name) {
    this.name = name;
  }
}
