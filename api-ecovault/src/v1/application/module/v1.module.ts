import { Module } from '@nestjs/common';
import DatabaseModule from './database.module';
import { HelloWorldController } from 'src/v1/infrastructure/controllers/hello-world';

@Module({
  imports: [DatabaseModule],
  controllers: [HelloWorldController],
  providers: [],
})
export default class V1Module {}
