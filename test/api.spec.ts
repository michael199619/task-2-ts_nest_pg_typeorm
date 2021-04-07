import {Test} from '@nestjs/testing';
import {UsersController} from '../src/users/users.controller';
import {UsersService} from '../src/users/users.service';
import {INestApplication} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {configService} from '../src/config';
import {UsersModule} from '../src/users/users.module';
import {WalletModule} from '../src/wallet/wallet.module';
import * as request from 'supertest';

describe('Api', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(configService.getOrmModuleOptions()),
                UsersModule,
                WalletModule
            ]
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    let userId: number;
    let currencyId: number;
    let walletToId: number;
    let walletFromId: number;

    it(`/POST create user`, (done) => {
        return request(app.getHttpServer())
            .post('/api/users')
            .send({name: 'john'})
            .set('Accept', 'application/json')
            .end((err, res) => {
                userId = res.body.id;
                if (err) return done(err);
                return done();
            });
    });

    it(`/GET users`, () => {
        return request(app.getHttpServer())
            .get('/api/users')
            .expect(200)
    });

    it(`/GET wallets`, (done) => {
        return request(app.getHttpServer())
            .get('/api/wallets')
            .expect(200)
            .end((err, res) => {
                const wallet = res.body.find(e => e.sum > 100)
                walletFromId = wallet.id;
                currencyId = wallet.currencyId;
                if (err) return done(err);
                return done();
            });
    });

    it(`/POST create wallet`, (done) => {
        return request(app.getHttpServer())
            .post('/api/wallets')
            .send({currencyId, userId})
            .set('Accept', 'application/json')
            .end((err, res) => {
                walletToId = res.body.id;
                if (err) return done(err);
                return done();
            });
    });

    it(`/POST transfer`, (done) => {
        return request(app.getHttpServer())
            .post('/api/wallets/transfer')
            .send({
                walletToId,
                walletFromId,
                sum: 50
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                console.log('transaction', res.body)
                if (err) return done(err);
                return done();
            });
    });

    afterAll(async () => {
        await app.close();
    });
});