import Injector from './injectors/injector';

export function Injectable(): ClassDecorator {
  // A decorator is a function that returns another function. The decorator function is called with the target class as its argument.
  return function (target: any) {
    // Get the root injector.
    const rootInjector = Injector.getRootInstance();

    // Add the provider to the root injector.
    rootInjector.addProvider(target, new target());
  };
}
