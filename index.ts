import ElementInjector from './injectors/element-injector';
import Injector from './injectors/injector';
import ModuleInjector from './injectors/module-injector';
import NullInjector from './injectors/null-injector';
import HeroService from './services/hero.service';

class MyComponent {
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    console.log(this.heroService.getHero());
  }
}

// Create a null injector.
// A null injector is a special injector that does not have any providers registered with it.
const nullInjector = new NullInjector();

// Create a root injector.
// The root injector is the top-level injector in the injector hierarchy.
const rootInjector = new Injector(nullInjector);

// Register the HeroService provider with the root injector.
// This makes the HeroService available to all injectors in the injector hierarchy.
//rootInjector.addProvider('HeroService', new HeroService());

// Create a module injector.
// A module injector is a child of the root injector. It is used to provide dependencies to components within a specific module.
const moduleInjector = new ModuleInjector(rootInjector);

// Register the HeroService provider with the module injector.
// This overrides the HeroService provider that was registered with the root injector.
// This means that components within the module will receive the HeroService instance that is registered with the module injector.
moduleInjector.addProvider('HeroService', new HeroService());

// Create an element injector.
// An element injector is a child of the module injector. It is used to provide dependencies to components and directives within a specific DOM element.
const elementInjector: Injector = new ElementInjector(moduleInjector);

// Create a new instance of the MyComponent class.
// The MyComponent class will be injected with the HeroService instance that is registered with the element injector.
const myComponent = new MyComponent(elementInjector.getProvider('HeroService'));

// Call the ngOnInit() method on the MyComponent class.
// This will log the hero service's hero name to the console.
myComponent.ngOnInit();

// Print all injectors in the console.
// This is helpful for debugging dependency injection issues.
// console.log('Null injector:', nullInjector);
// console.log('Root injector:', rootInjector);
// console.log('Module injector:', moduleInjector);
// console.log('Element injector:', elementInjector);
