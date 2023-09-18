import NullInjector from './null-injector';
import { ProviderMetadata } from './provider-metadata.model';

/**
 * Injector class to handle dependency injection.
 */
export default class Injector {
  /** A static property that stores the root injector instance. */
  private static _rootInstance: Injector | null = null;

  /** A map of providers to their associated instances. */
  private _providers: Map<any, any> = new Map();

  /** A map of view providers to their associated instances. */
  private _viewProviders: Map<any, any> = new Map();

  /** The parent injector, or a null injector if this is the root. */
  private _parent: Injector | NullInjector;

  /**
   * Creates an Injector instance.
   *
   * @param {Injector | NullInjector} [parent] - The parent injector. If not provided, creates a NullInjector.
   */
  constructor(parent?: Injector | NullInjector) {
    this._parent = parent || new NullInjector();
  }

  /**
   * Gets the map of registered providers.
   *
   * @returns {Map<any, any>} The map of providers to their associated instances.
   */
  public getProviders(): Map<any, any> {
    return this._providers;
  }

  /**
   * Retrieves the root instance of the Injector.
   *
   * @returns {Injector} The root injector instance.
   */
  static getRootInstance(): Injector {
    if (!this._rootInstance) {
      this._rootInstance = new Injector();
    }
    return this._rootInstance;
  }

  /**
   * Resolves a dependency based on the token.
   *
   * @template T - Type of the provider.
   * @param {any} token - The token used to look up the provider.
   * @returns {T | undefined} - Instance associated with the provider or undefined if not found.
   */
  static resolve<T>(token: any): T | undefined {
    const rootInstance = this.getRootInstance();
    return rootInstance.getProvider(token);
  }

  /**
   * Registers a new provider and its associated instance.
   *
   * @param {any} provider - The provider to register.
   * @param {any} value - The instance associated with the provider.
   * @param {boolean} isViewProvider - If the provider is a viewProvider or not
   */
  addProvider(
    provider: any,
    value: any,
    isViewProvider: boolean = false
  ): void {
    if (isViewProvider) {
      this._viewProviders.set(provider, value);
    } else {
      this._providers.set(provider, value);
    }
  }

  /**
   * Retrieves an instance associated with the provider.
   *
   * @template T - Type of the provider.
   * @param {new () => T} provider - The provider to retrieve.
   * @param {ProviderMetadata} [metadata={}] - Metadata options.
   * @param {boolean} [hostOnly=false] - If true, only look in the current injector and its parent.
   * @returns {T | undefined} - Instance associated with the provider or undefined if not found.
   */
  getProvider<T>(
    provider: new () => T,
    metadata: ProviderMetadata = {},
    hostOnly: boolean = false
  ): T | undefined {
    let value: T | undefined;

    // If 'self' metadata is true, only look in the current injector
    if (metadata.self) {
      return this._providers.get(provider);
    }

    // If 'skipSelf' metadata is true, skip the current injector
    if (metadata.skipSelf) {
      return this._parent.getProvider(provider, { self: true }, hostOnly);
    }

    // If 'host' metadata is true and hostOnly flag is set
    if (metadata.host && hostOnly) {
      return (
        this._viewProviders.get(provider) ||
        this._parent.getProvider(provider, { self: true }, true)
      );
    } else {
      value =
        this._providers.get(provider) || this._viewProviders.get(provider);
    }

    if (value) return value;

    if (metadata.self) {
      return undefined;
    }

    return this._parent.getProvider(provider, metadata, hostOnly);
  }
}
