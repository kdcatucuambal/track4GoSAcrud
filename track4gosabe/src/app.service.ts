import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  title: 'API WITH NESTJS';

  getHello(): string {
    return 'Hello World!';
  }

  getGreeting(): string {
    return `Hello`;
  }
}
