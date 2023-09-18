import { Injectable } from '../decorators';

@Injectable()
export class LoggerService {
  constructor(private log: string) {}

  printName() {
    console.log(`Logging this: ${this.log}`);
  }
}
