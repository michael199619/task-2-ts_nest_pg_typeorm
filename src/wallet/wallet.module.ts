import {HttpModule, HttpService, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntities } from './entities';
import { WalletService } from './wallet.service';

import { WalletController } from './wallet.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({

      }),
    }),
    TypeOrmModule.forFeature([...WalletEntities]),
  ],
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
