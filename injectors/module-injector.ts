// module-injector.ts

import Injector from './injector';

export default class ModuleInjector extends Injector {
  constructor(parent: Injector) {
    super(parent);
  }

  override getProvider(provider: any) {
    console.log(`Hi i'm the Module injector!!`);
    return super.getProvider(provider);
  }
}
