import { Inject, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataBaseProviders } from '../database/database.provider';

@Module({
  providers: [...dataBaseProviders],
  exports: [...dataBaseProviders],
})
export default class DatabaseModule {
  constructor(@Inject('DATABASE_CONNECTION') private dataSource: DataSource) {}

  async onModuleInit() {
    console.log('🚀 Inicializando conexão com o banco...');
    await this.dataSource.initialize();
  }

  async onModuleDestroy() {
    console.log('🔌 Encerrando conexão com o banco...');
    await this.dataSource.destroy();
  }
}
