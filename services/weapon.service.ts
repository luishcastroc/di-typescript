import { Injectable } from '../decorators';

@Injectable()
class WeaponService {
  getWeapon() {
    console.log('Fetching weapon from WeaponService...');
    return 'Kryptonite';
  }
}

export default WeaponService;
