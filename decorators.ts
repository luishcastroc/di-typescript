import Injector from './injectors/injector';

export function Injectable(): ClassDecorator {
  return function (target: any) {
    // Get the root injector.
    const rootInjector = Injector.getRootInstance();

    // Add the provider to the root injector.
    rootInjector.addProvider(target, new target());
  };
}
