import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2'); // prefijo de la app global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // solo deja la data que se espera
    forbidNonWhitelisted: true, //no permite ingresar data no esperada
  }));
  await app.listen(3000);
}
bootstrap();
