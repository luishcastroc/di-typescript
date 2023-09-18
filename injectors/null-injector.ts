import { ProviderMetadata } from './provider-metadata.model';

export default class NullInjector {
  getProvider<T>(
    provider: new () => T,
    metadata: ProviderMetadata = {}
  ): T | undefined {
    throw new Error(`No provider for ${provider}`);
  }
}
