import {ConnectionOptions} from 'typeorm';
import * as dotenv from 'dotenv';

import {UsersEntities} from '../users/entities';
import {WalletEntities} from '../wallet/entities';

dotenv.config();

export class ConfigService {
    public get(key: string) : any {
        return process.env[key];
    }

    public getOrmModuleOptions(): ConnectionOptions {
        return {
            type: 'postgres',
            port: parseInt(this.get('POSTGRES_PORT'), 10),
            username: this.get('POSTGRES_USER'),
            database: this.get('POSTGRES_DB'),
            password: this.get('POSTGRES_PASSWORD'),
            host: this.get('POSTGRES_HOST'),
            migrationsRun: false,
            entities: [
                ...WalletEntities,
                ...UsersEntities
            ],
            logging: true,
            synchronize: true,
        };
    }


}

export const configService = new ConfigService();
