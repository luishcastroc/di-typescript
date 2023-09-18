import { Injectable } from '../decorators';

@Injectable()
export class DebugService {
  constructor(private log: string) {}

  printName() {
    console.log(`Debugging this: ${this.log}`);
  }
}
