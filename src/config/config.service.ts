import {registerAs} from '@nestjs/config';
import {UsersEntities} from '../users/entities';
import {WalletEntities} from '../wallet/entities';

export const app = registerAs('app', () => ({
    port: process.env.APP_PORT,
    commission: process.env.COMMISSION
}));

export const db = registerAs('db', () => ({
    type: 'postgres',
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    migrationsRun: false,
    entities: [
        ...WalletEntities,
        ...UsersEntities
    ],
    logging: true,
    synchronize: true,
}));