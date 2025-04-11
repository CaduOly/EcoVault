import { Controller, Get } from '@nestjs/common';

@Controller('hello-world')
export class HelloWorldController {
  @Get()
  getHelloWorld(): string {
    return 'Hello, World!';
  }
}
