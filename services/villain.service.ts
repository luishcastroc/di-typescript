import { Injectable } from '../decorators';

@Injectable()
export class VillainService {
  getVillain() {
    console.log('Fetching villain from VillainService...');
    return 'Joker';
  }
}
