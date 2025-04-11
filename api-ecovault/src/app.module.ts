import { Module } from '@nestjs/common';
import V1Module from './v1/application/module/v1.module';

@Module({
  imports: [V1Module],
})
export class AppModule {}
