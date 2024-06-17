import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ApplicationModule } from './application.module';
import { applySwagger } from './helpers/applySwagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  applySwagger(app);

  await app.listen(3000);
}

(async () => bootstrap())();
