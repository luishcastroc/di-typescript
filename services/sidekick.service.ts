import { Injectable } from '../decorators';

@Injectable()
class SidekickService {
  getSidekick() {
    console.log('Fetching sidekick from SidekickService...');
    return 'Robin';
  }
}

export default SidekickService;
