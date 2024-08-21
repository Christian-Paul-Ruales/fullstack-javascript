import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // eliminar datos que no estan en el dto
      forbidNonWhitelisted: true, // devolver error si hay datos que no estan en el dto
    })
  );
  await app.listen(3000);
}
bootstrap();
