import { Injectable, NotFoundException } from '@nestjs/common';
// es injectable
@Injectable()
export class CarsService {
  private cars: {
    id: number;
    brand: string;
    model: string;
  }[] = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corola',
    },
    {
      id: 2,
      brand: 'Chevrolet',
      model: 'Vitara',
    },
    {
      id: 3,
      brand: 'Ranault',
      model: 'Sandero',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }
}
