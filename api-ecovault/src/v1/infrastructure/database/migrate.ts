import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
dotenv.config({ path: 'infra/env/.env.dev' });

async function initialize(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
  });

  await dataSource.initialize();
  return dataSource;
}

async function runSqlFile(filePath: string, dataSource: DataSource) {
  const absolutePath = resolve(filePath);
  const sql = readFileSync(absolutePath, 'utf8');

  const queries = sql
    .split(';')
    .map(query => query.trim())
    .filter(query => query.length > 0);

  for (const query of queries) {
    await dataSource.query(query);
  }
}

async function runMigrations() {
  const dataSource = await initialize();

  try {
    console.log('📄 Lendo e executando arquivo SQL...');
    await runSqlFile(
      'infra/scripts/migrations/001_create_tables.sql',
      dataSource,
    );
    console.log('✅ Arquivo SQL executado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar o SQL:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
    console.log('🔌 Conexão finalizada.');
  }
}

runMigrations().catch(error => {
  console.error('❌ Erro ao executar as migrações:', error);
  process.exit(1);
});
