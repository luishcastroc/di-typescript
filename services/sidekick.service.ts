import { Injectable } from '../decorators';

@Injectable()
export class SidekickService {
  getSidekick() {
    console.log('Fetching sidekick from SidekickService...');
    return 'Robin';
  }
}
