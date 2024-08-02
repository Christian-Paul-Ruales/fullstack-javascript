import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

// genera una clase con el decorador de modulo
@Module({
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
