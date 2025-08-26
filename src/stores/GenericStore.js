import { makeObservable, observable, action } from 'mobx';

export class GenericStore {
  data = {};

  constructor() {
    makeObservable(this, {
      data: observable,
      setData: action,
    });
  }

  setData(data) {
    this.data = { ...this.data, ...data };
  }
}
