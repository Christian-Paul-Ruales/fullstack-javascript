import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  /** decorador Get */
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log({ id });
    
    return this.carsService.findOneById(id);
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }
  /**
   * Aactualizar, podemos usar el put
   */
  @Patch()
  updateCar(@Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return `Method delete for ${id}`;
  }

}
