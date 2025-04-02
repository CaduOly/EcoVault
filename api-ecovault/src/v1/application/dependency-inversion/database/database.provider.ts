import { MySqlWriteDataSourceToken } from '../../tokens/v1.tokens';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: MySqlWriteDataSourceToken,
        useFactory: () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'test',
                // entities: [User],
                extra: {
                    connectionLimit: 10,
                },
            });
            return dataSource;
        },
    },
];
