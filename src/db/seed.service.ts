import {Injectable} from '@nestjs/common';
import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {User} from '../users/entities';
import {Currency, Wallet} from '../wallet/entities';
import fixtures from './fixtures';

@Injectable()
export class SeedService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {}

    async onModuleInit() {
        console.log('[Seed started]');

        if (await this.entityManager.findOne(User)) {
            console.log('[Seed success]');
            return false;
        }

        console.log('[Creating User started]');

        await this.entityManager.save(User, fixtures.users);

        console.log('[Creating Currency finished]');

        await this.entityManager.save(Currency, fixtures.currencies);

        console.log('[Creating Wallet finished]');

        await this.entityManager.save(Wallet, fixtures.wallets);

        console.log('[Seed success]');
    }
}
