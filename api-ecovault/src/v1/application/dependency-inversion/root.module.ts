import { Module } from '@nestjs/common';
import { V1Module } from './v1.module';

@Module({
    imports: [V1Module],
})
export default class RootModule {}
