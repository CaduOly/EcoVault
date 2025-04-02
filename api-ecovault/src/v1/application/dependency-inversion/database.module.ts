import { Inject, Module } from '@nestjs/common';
import { databaseProviders } from './database/database.provider';
import { DataSource } from 'typeorm';
import { MySqlWriteDataSourceToken } from '../tokens/v1.tokens';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {
    constructor(@Inject(MySqlWriteDataSourceToken) private writeDataSource: DataSource) {}
    async onModuleInit() {
        await this.writeDataSource.initialize();
    }
    async onModuleDestroy() {
        await this.writeDataSource.destroy();
    }
}
