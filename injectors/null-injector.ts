export default class NullInjector {
  getProvider(provider: any) {
    throw new Error(`No provider for ${provider}`);
  }
}
