import { Module } from '@nestjs/common';
import {app, db} from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [app, db]
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class AppConfigModule {}