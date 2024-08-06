import { Car } from 'src/cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';
export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corola',
  },
  {
    id: uuid(),
    brand: 'Renault',
    model: 'Logan',
  },
  {
    id: uuid(),
    brand: 'Honda',
    model: 'Civic',
  },
];
