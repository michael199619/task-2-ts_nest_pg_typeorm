import {HttpModule, HttpService, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntities } from './entities';
import { WalletService } from './wallet.service';

import { WalletController } from './wallet.controller';
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([...WalletEntities])],
  providers: [WalletService, ConfigService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
