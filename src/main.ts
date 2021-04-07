import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config';

export async function bootstrap(port: number, hostname?: string) {
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

  await app.listen(port, hostname);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap(Number(configService.get('APP_PORT')));
