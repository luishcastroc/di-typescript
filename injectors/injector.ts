import NullInjector from './null-injector';

export default class Injector {
  // A static property that stores the root injector instance.
  private static _rootInstance: Injector | null = null;

  // A map of providers to values.
  private _providers: Map<any, any> = new Map();

  // The parent injector, or a null injector if the Injector instance is the root injector.
  private _parent: Injector | NullInjector;

  /**
   * Creates a new injector instance.
   *
   * @param parent The parent injector, or a null injector if the Injector instance is the root injector.
   */
  constructor(parent?: Injector | NullInjector) {
    this._parent = parent || new NullInjector();
  }

  /**
   * Returns the root injector instance.
   *
   * @returns The root injector instance.
   */
  static getRootInstance(): Injector {
    if (!this._rootInstance) {
      this._rootInstance = new Injector();
    }
    return this._rootInstance;
  }

  /**
   * Adds a provider to the injector.
   *
   * @param provider The provider to add.
   * @param value The value to associate with the provider.
   */
  addProvider(provider: any, value: any) {
    this._providers.set(provider, value);
  }

  /**
   * Gets a provider from the injector.
   *
   * @param provider The provider to get.
   * @returns The provider value, or undefined if the provider is not registered.
   */
  getProvider(provider: any) {
    const value = this._providers.get(provider);
    if (value) return value;
    return this._parent.getProvider(provider);
  }
}
