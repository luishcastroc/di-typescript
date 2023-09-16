import Injector from './injector';

export default class ModuleInjector extends Injector {
  constructor(parent: Injector) {
    super(parent);
  }
}
