import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
// decorador module
//carsModule es importado gracias al comando
@Module({
  imports: [CarsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
