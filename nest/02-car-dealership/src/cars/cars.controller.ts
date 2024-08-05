import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './interfaces/car.interface';
import { UpdateCarDto } from './dto/update-car.dto';

//@UsePipes(ValidationPipe) no recomendado
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  /** decorador Get */
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    console.log({ id });
    return this.carsService.findOneById(id);
  }

  @Post()
  create(@Body() body: CreateCarDto): Car {
    return this.carsService.create(body);
  }
  /**
   * Aactualizar, podemos usar el put
   */
  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCarDto,
  ) {
    return this.carsService.update(id, body);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
}
