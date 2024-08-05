import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';
// es injectable
@Injectable()
export class CarsService {
  
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corola',
    },
    {
      id: uuid(),
      brand: 'Chevrolet',
      model: 'Vitara',
    },
    {
      id: uuid(),
      brand: 'Ranault',
      model: 'Sandero',
    },
  ];

  findAll(): Car[] {
    return this.cars;
  }

  findOneById(id: string): Car {
    const car: Car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  create(createCarDto: CreateCarDto): Car {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto): Car {
    let carDB: Car = this.findOneById(id);
    
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Cant replace ${id}, action not permited`);
    
    this.cars = this.cars.map((car: Car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  delete(id: string): Car[] {
    const car: Car = this.findOneById(id);
    const index: number = this.cars.indexOf(car);
    // this.cars.filter( car => car.id !== id);
    this.cars.splice(index, 1);
    return this.cars;
  }
}
