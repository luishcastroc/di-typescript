import { Injectable } from '../decorators';

@Injectable()
export class HeroService {
  getHero() {
    console.log('Fetching hero from HeroService...');
    return 'Superman';
  }
}
