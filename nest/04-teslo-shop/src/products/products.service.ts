import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate } from 'uuid';
import { ProductImage } from './entities';
/***
   * Vamo a trabajar con patron repositorio
   */
@Injectable()
export class ProductsService {

  private readonly log = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const {images = [], ...productDetails} = createProductDto;
      const product = this.productRepository.create({...productDetails, images: images
        .map(image => this.productImageRepository.create({url: image}))}); // recorremos las imagenes y se crean unicamente las imagenes
      

      await this.productRepository.save(product);
      
      return {...product, images};

    } catch (error) {
      this.log.error(error);
      this.handleExceptions(error);

    }
  }

  async findAll(paginationDTO: PaginationDto) {
    const { limit = 10, offset = 0} = paginationDTO;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true
      }
      // TODO: relaciones
    });

    return products.map(
      product => ({...product, images: product.images.map(
        img => img.url)
      })
    )
  }

  async findOne(term: string) {
    let product: Product;
    // validar si es uuid
    if(validate(term)){
      // product = await this.productRepository.findOne(where: { id: term }, relations: { images: true});
      product = await this.productRepository.findOneBy({ id: term });
    } else{
      const queryBuilder = this.productRepository.createQueryBuilder('productq');
      product = await queryBuilder
      .where(`UPPER(title) =:title or slug =:slug`, {
        title: term.toUpperCase(),
        slug: term.toLowerCase()
      }
      ).leftJoinAndSelect('productq.images', 'pImages')
      .getOne();


    }

    if(!product){
      throw new NotFoundException(`Product with find term ${term} not found`);
    }
    return product;
  }

  async findOnePlain (term: string) {
    const  {images = [], ...rest} = await this.findOne(term);
    return {
      ...rest,
      images: images.map(img => img.url)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    
      const {images, ...toUpdate} = updateProductDto;
      // preload: busca el producto y modifica
      const product = await this.productRepository.preload({
        id,
        ...toUpdate
      });
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect(); // conectar a la base
      await queryRunner.startTransaction(); // iniciar transaccion

    try {

      if(images){
        // borramos las anteriores imagenes
        await queryRunner.manager.delete( ProductImage, { product: {id: id}} ); // elimina imagenes de ese producto
        product.images = images.map( image => this.productImageRepository.create({url: image}));
      } 
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);

    } catch (error) {
      this.log.error(error);
      this.handleExceptions(error);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

    } 
    

    return `This action updates a #${id} product`;
  }

  remove(id: string) {

    this.productRepository.delete({id: id});
    return `Remove ${id} product succesfully`;
  }

  /** NO RECOMENDABLE USAR */
  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      return await query
      .delete()
      .where({})
      .execute();
    
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  private handleExceptions(error: any){
    if(error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    
    throw new InternalServerErrorException(`Not detected error, see logs`);
  }
}
