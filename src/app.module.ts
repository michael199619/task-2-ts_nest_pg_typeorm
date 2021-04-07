import {HttpModule, Module} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config';
import { UsersModule } from './users/users.module';
import {WalletModule} from './wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getOrmModuleOptions()),
    UsersModule,
    WalletModule
  ],
  controllers: []
})
export class AppModule {}
