import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import seed from './utils/seed';
import {ConfigService} from "@nestjs/config";

export async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        logger: ['debug'],
    });

    app.enableCors({
        origin: '*'
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            validateCustomDecorators: true,
            transformOptions: {
                excludeExtraneousValues: true
            }
        }),
    );

    const configService: ConfigService = app.get('ConfigService');

    await app.listen(configService.get<number>('app.port'));
    await seed();

    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
