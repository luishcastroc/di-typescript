import Injector from './injector';

export default class ElementInjector extends Injector {
  constructor(parent: Injector) {
    super(parent);
  }

  getProvider(provider, metadata = {}, hostOnly = false) {
    let value = this.getProviders().get(provider);
    if (!value) {
      value = super.getProvider(provider, metadata, hostOnly);
    }
    return value;
  }
}
