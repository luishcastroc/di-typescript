import { Injectable } from '../decorators';

@Injectable()
export class MutantsService {
  getMutant() {
    console.log('Fetching a mutant from MutantsService...');
    return 'Leonardo';
  }
}
