// injector.ts

import NullInjector from './null-injector';

export default class Injector {
  private static _rootInstance: Injector | null = null;
  private _providers: Map<any, any> = new Map();
  private _parent: Injector | NullInjector;

  constructor(parent?: Injector | NullInjector) {
    this._parent = parent || new NullInjector();
  }

  static getRootInstance(): Injector {
    if (!this._rootInstance) {
      this._rootInstance = new Injector();
    }
    return this._rootInstance;
  }

  addProvider(provider: any, value: any) {
    this._providers.set(provider, value);
  }

  getProvider(provider: any) {
    const value = this._providers.get(provider);
    if (value) return value;
    return this._parent.getProvider(provider);
  }
}
