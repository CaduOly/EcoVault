import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

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

async function dropAllTables() {
  try {
    const dataSource = await initialize();
    const queryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();

    console.log('🔴 Deletando todas as tabelas...');

    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');

    await queryRunner.query('DROP TABLE IF EXISTS descartes');
    await queryRunner.query('DROP TABLE IF EXISTS produtos_log');
    await queryRunner.query('DROP TABLE IF EXISTS produtos');
    await queryRunner.query('DROP TABLE IF EXISTS usuarios');
    await queryRunner.query('DROP TABLE IF EXISTS descricao_descartes');
    await queryRunner.query('DROP TABLE IF EXISTS produtos_status');

    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('✅ Todas as tabelas foram deletadas com sucesso!');

    await queryRunner.release();
    await dataSource.destroy();
  } catch (err) {
    console.error('❌ Erro ao deletar tabelas:', err);
    process.exit(1);
  }
}

dropAllTables().catch(err => {
  console.error('❌ Erro ao executar o script:', err);
  process.exit(1);
});
