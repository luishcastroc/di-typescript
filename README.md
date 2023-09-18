## Simplified Angular-Style Dependency Injection in TypeScript

This TypeScript project aims to recreate the Dependency Injection (DI) framework found in Angular. We've implemented some of the core concepts and decorators like `@Self`, `@Optional`, `@Host`, and others. The goal is to make Angular's complex DI hierarchy more approachable. This project is built to run on [StackBlitz](https://stackblitz.com/edit/angular-di-typescript-lhcc).

### What's the Point?

Angular's DI system is powerful but can be challenging to understand, especially the hierarchical nature of injectors. We try to break it down here by implementing a simplified version. For an in-depth explanation of Angular's DI, check out the [official documentation](https://angular.io/guide/dependency-injection).

### Key Components

1. **Injectors**: Simulates Angular's hierarchical injectors.
2. **Decorators**: Custom decorators like `@Injectable`, `@Self`, `@Optional`, etc., that mimic Angular's DI decorators.
3. **Provider Metadata**: Custom metadata attached to providers to understand their scope and requirements.

### How to Run

Open the project on StackBlitz and hit the "Run" button to see it in action.

### Understanding the Code

- `create-component.ts`: This file contains the `createMyComponent` function which simulates Angular's way of creating a component instance, respecting the provider hierarchy and metadata.
- `decorators.ts`: This is where the custom decorators that you would find in Angular (`@Injectable`, `@Self`, `@Optional`, etc.) are defined.
- `injectors/`: This directory holds classes that mimic Angular's hierarchical injector system.

- `services/`: Services that will be injected, mimicking typical Angular services.

### How to Use

To use this DI system, simply decorate your classes and constructor parameters with the decorators, much like you would in an Angular application.

### Dive Deeper

For a better understanding of DI hierarchies, take a look at the example where `NullInjector`, `ModuleInjector`, and `ElementInjector` come into play. This mirrors Angular's hierarchy of NullInjector -> Root Injector -> Module Injector -> Element Injector.

### Contributing

If you think you can add more clarity or features that would make this closer to Angular's DI, feel free to open a PR.
