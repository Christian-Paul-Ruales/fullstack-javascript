import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**Global pipes */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true /** solo deja la data que espera*/,
      forbidNonWhitelisted: true /** no permite ingresar data no esperada*/,
    }),
  );
  await app.listen(3000);
}
bootstrap();
