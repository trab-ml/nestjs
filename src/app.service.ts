import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'EN: Hello World!';
  }
  getHelloInFrench(): string {
    return 'FR: Salut!';
  }
}
