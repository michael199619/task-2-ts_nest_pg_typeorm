import { Injectable }from '@nestjs/common';
import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {User} from './users/entities';
import {Currency, Wallet} from './wallet/entities';

@Injectable()
export class SeedService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {}

    async onModuleInit() {
        console.log("[Seed started]");

        if (await this.entityManager.findOne(User)) {
            console.log("[Seed success]");
            return false;
        }

        console.log("[Creating User started]")
        const users = await this.entityManager.save(User, [
            {name: 'michael'},
            {name: 'anna'}
        ])

        console.log("[Creating Currency finished]")

        const currency = await this.entityManager.save(Currency, {name: 'ETH'});

        console.log("[Creating Wallet finished]");

        await this.entityManager.save(Wallet,  [
            this.entityManager.create(Wallet, {
                sum: 1000,
                currencyId: currency.id,
                userId: users[0].id
            }),
            this.entityManager.create(Wallet, {
                sum: 1000,
                currencyId: currency.id,
                userId: users[1].id
            })
        ]);

        console.log("[Seed success]");
    }
}
