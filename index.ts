import { createMyComponent } from './create-component';
import { Host, Optional, Self, SkipSelf } from './decorators';
import ElementInjector from './injectors/element-injector';
import Injector from './injectors/injector';
import ModuleInjector from './injectors/module-injector';
import NullInjector from './injectors/null-injector';
import { DebugService } from './services/debug.service';
import { HeroService } from './services/hero.service';
import { LoggerService } from './services/logger.service';
import { SidekickService } from './services/sidekick.service';
import { VillainService } from './services/villain.service';

class MyComponent {
  constructor(
    private heroService: HeroService,
    @SkipSelf() private loggerService: LoggerService,
    @Self() private villainService?: VillainService,
    @Optional() public sideKicksService?: SidekickService,
    @Host() public debugService?: DebugService
  ) {}

  ngOnInit() {
    // Fetch hero, sidekick, villain and logger info
    console.log(this.heroService.getHero());
    if (this.sideKicksService) {
      console.log(this.sideKicksService.getSidekick());
    }
    if (this.villainService) {
      console.log(this.villainService.getVillain());
    }
    if (this.loggerService) {
      this.loggerService.printName();
    }
    if (this.debugService) {
      // New addition
      this.debugService.printName();
    }
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

// Create and initialize the component
const myComponent = createMyComponent(
  MyComponent,
  elementInjector,
  [new HeroService()],
  true
);
myComponent.ngOnInit();

// Uncomment these for debugging DI hierarchy
// console.log('Null injector:', nullInjector);
// console.log('Root injector:', rootInjector);
// console.log('Module injector:', moduleInjector);
// console.log('Element injector:', elementInjector);
