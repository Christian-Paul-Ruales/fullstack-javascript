import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Totoya',
    //   createdAt: new Date().getTime(),
    // },
  ];

  create(createBrandDto: CreateBrandDto) {
    // desestructuracion 
    const { name } = createBrandDto;
    
    const brand: Brand = {
      id: uuid(),
      name: name.toUpperCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => (brand.id = id));
    if (!brand)
      throw new NotFoundException(`Brand with id "${id} not founded"`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB: Brand = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brandDB.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto };
        return brandDB;
      } else {
        return brand;
      }
    });
    return brandDB;
  }

  remove(id: string) {
    return (this.brands = this.brands.filter((brand) => brand.id !== id));
  }
  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
