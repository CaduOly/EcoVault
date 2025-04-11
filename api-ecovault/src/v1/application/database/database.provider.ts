import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'infra/env/.env.dev' });

export const dataBaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });
      return dataSource;
    },
  },
];
