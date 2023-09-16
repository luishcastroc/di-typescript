// element-injector.ts

import Injector from './injector';

export default class ElementInjector extends Injector {
  constructor(parent: Injector) {
    super(parent);
  }

  override getProvider(provider: any) {
    console.log(`Hi i'm the Element injector!!`);
    return super.getProvider(provider);
  }
}
