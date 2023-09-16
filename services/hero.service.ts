import { Injectable } from '../decorators';

@Injectable()
class HeroService {
  getHero() {
    console.log('Fetching hero from HeroService...');
    return 'Superman';
  }
}

export default HeroService;
