import { createMyComponent } from './create-component';
import { Host, Inject, Optional, Self, SkipSelf } from './decorators';
import ElementInjector from './injectors/element-injector';
import { EnvironmentInjector } from './injectors/environment-injector';
import Injector from './injectors/injector';
import ModuleInjector from './injectors/module-injector';
import NullInjector from './injectors/null-injector';
import { DebugService } from './services/debug.service';
import { HeroService } from './services/hero.service';
import { LoggerService } from './services/logger.service';
import { MutantsService } from './services/mutants.service';
import { SidekickService } from './services/sidekick.service';
import { VillainService } from './services/villain.service';

const appDiv: HTMLElement = document.getElementById('app');

class MyComponent {
  constructor(
    private heroService: HeroService,
    @Inject(EnvironmentInjector)
    private environmentInjector: EnvironmentInjector,
    @SkipSelf() private loggerService: LoggerService,
    @Self() private villainService?: VillainService,
    @Optional() public sideKicksService?: SidekickService,
    @Host() public debugService?: DebugService
  ) {}

  ngOnInit() {
    appDiv.innerHTML += `<p>Hero: ${this.heroService.getHero()}</p>`;

    if (this.sideKicksService) {
      appDiv.innerHTML += `<p>Sidekick: ${this.sideKicksService.getSidekick()}</p>`;
    }

    if (this.villainService) {
      appDiv.innerHTML += `<p>Villain: ${this.villainService.getVillain()}</p>`;
    }

    if (this.loggerService) {
      this.loggerService.printName();
      appDiv.innerHTML += `<p>Logger: Check the console`;
    }

    if (this.debugService) {
      this.debugService.printName();
      appDiv.innerHTML += `<p>Debug: Check the console</p>`;
    }

    const mutantsService = this.environmentInjector.getProvider(MutantsService);
    console.log(mutantsService.getMutant());
  }
}

// Special injector without providers
const nullInjector = new NullInjector();

// Top-level injector; parent of all injectors
const rootInjector = new Injector(nullInjector);

// Module injector, a child of the root, provides dependencies for a module
const moduleInjector = new ModuleInjector(rootInjector);

// Service registration for the module scope
moduleInjector.addProvider(LoggerService, new LoggerService('Module Provider'));
moduleInjector.addProvider(DebugService, new DebugService('Module Provider'));
moduleInjector.addProvider(HeroService, new HeroService());

// Element injector, a child of the module, provides dependencies for components in a DOM element
const elementInjector: Injector = new ElementInjector(moduleInjector);
elementInjector.addProvider(
  LoggerService,
  new LoggerService('Element Provider')
);
elementInjector.addProvider(
  DebugService,
  new DebugService('Element Provider from ViewProviders'),
  true
); // Register as a ViewProvider
elementInjector.addProvider(VillainService, new VillainService());

// Uncomment to inspect the providers in the element and module injector
// console.log('Element Injector Providers:', [...elementInjector['_providers'].keys()]);
// console.log('Module Injector Providers:', [...moduleInjector['_providers'].keys()]);

//Create a new Environment Injector used to provide dependencies to standalone components, lazy-loaded routes, and other parts of your application that are not part of the component hierarchy
const environmentInjector = new EnvironmentInjector(rootInjector);

// Register a provider with the environment injector
environmentInjector.addProvider(MutantsService, new MutantsService());

// Create and initialize the component
const myComponent = createMyComponent(
  MyComponent,
  elementInjector,
  [new HeroService(), environmentInjector],
  true
);
myComponent.ngOnInit();

// Uncomment these for debugging DI hierarchy
// console.log('Null injector:', nullInjector);
// console.log('Root injector:', rootInjector);
// console.log('Module injector:', moduleInjector);
// console.log('Element injector:', elementInjector);
