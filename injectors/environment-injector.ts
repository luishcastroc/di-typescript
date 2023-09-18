import Injector from './injector';
import { ProviderMetadata } from './provider-metadata.model';

/**
 * Specialized injector that first checks an environment-specific injector
 * before falling back to the standard injector hierarchy.
 */
export class EnvironmentInjector extends Injector {
  private _environmentInjector: Injector | null | undefined;

  /**
   * Creates an instance of EnvironmentInjector.
   *
   * @param {Injector} parentInjector - The parent injector.
   * @param {Injector | null} [environmentInjector] - An optional environment-specific injector.
   */
  constructor(parentInjector: Injector, environmentInjector?: Injector | null) {
    super(parentInjector);
    this._environmentInjector = environmentInjector;
  }

  /**
   * Retrieves a provider.
   *
   * @template T - The type of the provider.
   * @param {new () => T} provider - The class of the provider.
   * @param {ProviderMetadata} [metadata={}] - Optional metadata.
   * @param {boolean} [hostOnly=false] - Whether to restrict to the host injector.
   * @returns {T | undefined} - The provider instance, or undefined if not found.
   */
  getProvider<T>(
    provider: new () => T,
    metadata: ProviderMetadata = {},
    hostOnly: boolean = false
  ): T | undefined {
    let value: T | undefined;

    // Check the environment injector first, if it is provided
    if (this._environmentInjector) {
      value = this._environmentInjector.getProvider(
        provider,
        metadata,
        hostOnly
      );
    }

    if (value) return value;

    // Behave as the original getProvider() method if the environment injector is not provided or the provider is not found in the environment injector
    return super.getProvider(provider, metadata, hostOnly);
  }
}
