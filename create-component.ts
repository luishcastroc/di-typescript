import Injector from './injectors/injector';
import 'reflect-metadata';
import { getMetadata } from './decorators';

/**
 * Creates an instance of a given component type, injecting dependencies as necessary.
 *
 * @param {any} ComponentType - The class of the component to instantiate.
 * @param {Injector} injector - The injector to use for resolving dependencies.
 * @param {any[]} [manualDeps=[]] - Optional array of manually provided dependencies.
 * @param {boolean} [hostOnly=false] - Flag to restrict resolution to host injector.
 * @returns An instance of `ComponentType` with dependencies injected.
 */
export function createMyComponent(
  ComponentType: any,
  injector: Injector,
  manualDeps: any[] = [],
  hostOnly: boolean = false
) {
  // Fetch metadata about the types of dependencies the component needs.
  const paramMetadata =
    Reflect.getMetadata('design:paramtypes', ComponentType) || manualDeps;

  // Array to hold the resolved dependencies.
  const resolvedProviders: any[] = [];

  // Loop through each dependency metadata.
  for (const [index, param] of paramMetadata.entries()) {
    let provider;
    // Fetch any custom metadata (e.g., decorators like @Optional, @Self etc.) applied to the dependency.
    const metadata = getMetadata(ComponentType, index);

    // Use custom token if available, otherwise use type metadata
    const token = metadata?.provider || param;

    // If custom metadata exists.
    if (metadata) {
      try {
        // Attempt to resolve the provider using the injector.
        provider = injector.getProvider(token, metadata, hostOnly);

        // Handle @Self decorator scenario
        if (metadata.self && provider === undefined) {
          provider = metadata.optional ? null : undefined;
        }
      } catch (error) {
        // Handle optional dependencies that couldn't be resolved.
        if (metadata.optional) {
          provider = null;
        } else {
          // Re-throw error for non-optional, unresolvable dependencies.
          throw error;
        }
      }
    } else {
      // No custom metadata; either use the manually passed dependency or resolve it.
      if (manualDeps[index] instanceof Object) {
        provider = manualDeps[index];
      } else {
        provider = injector.getProvider(manualDeps[index] || token);
      }
    }

    // Add the resolved provider to the array of resolved providers.
    resolvedProviders.push(provider);
  }

  // Instantiate the component, injecting the resolved dependencies.
  return new ComponentType(...resolvedProviders);
}
