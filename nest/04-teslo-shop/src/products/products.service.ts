import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate } from 'uuid';
/***
   * Vamo a trabajar con patron repositorio
   */
@Injectable()
export class ProductsService {

  private readonly log = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      
      return product;

    } catch (error) {
      this.log.error(error);
      this.handleExceptions(error);

    }
  }

  async findAll(paginationDTO: PaginationDto) {
    const { limit = 10, offset = 0} = paginationDTO;
    return await this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    });
  }

  async findOne(term: string) {
    let product: Product;
    // validar si es uuid
    if(validate(term)){
      product = await this.productRepository.findOneBy({ id: term });
    } else{
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
      .where(`UPPER(title) =:title or slug =:slug`, {
        title: term.toUpperCase(),
        slug: term.toLowerCase()
      }
      ).getOne();


    }

    if(!product){
      throw new NotFoundException(`Product with find term ${term} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      // preload: busca el producto y modifica
      const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto
      });

      return await this.productRepository.save(product);
      

    } catch (error) {
      this.log.error(error);
      this.handleExceptions(error);

    }
    

    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    this.productRepository.delete({id: id});
    return `Remove ${id} product succesfully`;
  }

  private handleExceptions(error: any){
    if(error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    
    throw new InternalServerErrorException(`Not detected error, see logs`);
  }
}
