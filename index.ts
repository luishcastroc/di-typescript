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
const nullInjector = new NullInjector();

// Create a root injector.
const rootInjector = new Injector(nullInjector);

// Register the HeroService provider with the root injector.
//rootInjector.addProvider('HeroService', new HeroService());

// Create a module injector.
const moduleInjector = new ModuleInjector(rootInjector);

// Register the HeroService provider with the root injector.
moduleInjector.addProvider('HeroService', new HeroService());

// Create an element injector.
const elementInjector: Injector = new ElementInjector(moduleInjector);

// Create a new instance of the MyComponent class.
const myComponent = new MyComponent(elementInjector.getProvider('HeroService'));

// Call the ngOnInit() method on the MyComponent class.
myComponent.ngOnInit();

// Print all injectors in the console.
// console.log('Null injector:', nullInjector);
// console.log('Root injector:', rootInjector);
// console.log('Module injector:', moduleInjector);
// console.log('Element injector:', elementInjector);
