import {HttpModule, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {WalletModule} from './wallet/wallet.module';
import {AppConfigModule} from './config/config.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ConnectionOptions} from 'typeorm';
import {SeedService} from './seed.service';

@Module({
    imports: [
        AppConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get<ConnectionOptions>('db'),
        }),
        UsersModule,
        WalletModule,
    ],
    controllers: [],
    providers: [SeedService],
    exports: [SeedService]
})

export class AppModule {}
