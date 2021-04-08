import {HttpModule, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {WalletModule} from './wallet/wallet.module';
import {AppConfigModule} from './config/config.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ConnectionOptions} from 'typeorm';

@Module({
    imports: [
        AppConfigModule,
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return configService.get<ConnectionOptions>('db')
            },
        }),
        UsersModule,
        WalletModule,
    ],
    controllers: [],
})

export class AppModule {}
