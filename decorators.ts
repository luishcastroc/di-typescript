import 'reflect-metadata';
import { EnvironmentInjector } from './injectors/environment-injector';
import Injector from './injectors/injector';
import { ProviderMetadata } from './injectors/provider-metadata.model';

/**
 * Decorator to mark a class as injectable.
 * Registers the class and its instance with the root injector.
 */
export function Injectable(): ClassDecorator {
  return function (target: any) {
    const rootInjector = Injector.getRootInstance();
    rootInjector.addProvider(target, new target());
  };
}

/**
 * Parameter decorator marking the parameter as optional.
 * @see ProviderMetadata#optional
 */
export function Optional(): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    Reflect.defineMetadata(
      'optional',
      true,
      target,
      `parameter:${parameterIndex}`
    );
  };
}

/**
 * Parameter decorator marking that the parameter should be resolved from the same host.
 * @see ProviderMetadata#self
 */
export function Self(): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    Reflect.defineMetadata('self', true, target, `parameter:${parameterIndex}`);
  };
}

/**
 * Parameter decorator marking that the parameter should skip the host and look to the parent for resolution.
 * @see ProviderMetadata#skipSelf
 */
export function SkipSelf(): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    Reflect.defineMetadata(
      'skipSelf',
      true,
      target,
      `parameter:${parameterIndex}`
    );
  };
}

/**
 * Parameter decorator marking that the parameter should be resolved from the host element only.
 * @see ProviderMetadata#host
 */
export function Host(): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    Reflect.defineMetadata('host', true, target, `parameter:${parameterIndex}`);
  };
}

/**
 * Decorator to inject a provider into a constructor parameter.
 *
 * @param {any} provider - The provider to inject.
 */
export function Inject(provider: any): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    let metadata: ProviderMetadata = getMetadata(target, parameterIndex);
    if (!metadata) {
      metadata = {};
    }

    // Add the provider property to the metadata object
    metadata.provider = provider;

    // If the provider is a special class like EnvironmentInjector, you can add additional logic here
    if (provider === EnvironmentInjector) {
      metadata.isEnvironmentInjector = true;
    }

    Reflect.defineMetadata(
      'providerMetadata',
      metadata,
      target,
      `parameter:${parameterIndex}`
    );
  };
}

/**
 * Fetches the custom metadata for a given parameter of a class.
 *
 * @param {any} target - Class for which to retrieve metadata.
 * @param {number} parameterIndex - Index of the parameter in the class constructor.
 * @returns {ProviderMetadata|null} - An object with custom metadata for the parameter, or null if none found.
 */
export function getMetadata(
  target: any,
  parameterIndex: number
): ProviderMetadata | null {
  const metadata: ProviderMetadata = {};

  if (Reflect.getMetadata('optional', target, `parameter:${parameterIndex}`)) {
    metadata.optional = true;
  }
  if (Reflect.getMetadata('self', target, `parameter:${parameterIndex}`)) {
    metadata.self = true;
  }
  if (Reflect.getMetadata('skipSelf', target, `parameter:${parameterIndex}`)) {
    metadata.skipSelf = true;
  }
  if (Reflect.getMetadata('host', target, `parameter:${parameterIndex}`)) {
    metadata.host = true;
  }

  // Check if metadata is empty
  if (Object.keys(metadata).length === 0) {
    return null;
  }

  return metadata;
}
