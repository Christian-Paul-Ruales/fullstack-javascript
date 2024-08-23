# TESLO SHOP CON ORM
## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Eliminacion del prettier (OPCIONAL)
```bash
yarn remove prettier
```
```bash
yarn remove eslint-con
fig-prettier eslint-plugin-pretti
er
```

## Creacion Base de datos (docker compose)
1. primera version del archivo dockercompose

```yml
services:
  db:
    image: postgres:14.3
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: teslodb
    volumes:
      - ./postgres:/var/lib/postgresql/data ## lugar por defecto de postgres
```
2. Ejecutar la base de datos
```bash
docker compose -f docker-compose.dev.yaml up -d
```

## Conexion a base de datos
```
https://docs.nestjs.com/techniques/database
```
__Vamos a usar typeOrm__

1. Variables de entorno
```bash
yarn add @nestjs/config
```

2. En el app.module.ts realizar la importacion
```javascript
@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
```
3. Instalar typeorm
```bash
yarn add @nestjs/typeorm typeorm
```
3. Instalar el paquete de postgres
```bash
yarn add pg
```
5. en el app.module.ts. importar TypeOrmModule.forRoot
```javascript
@Module({
  @Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, // carga las entidades automaticamente
      synchronize: true, // sincroniza automaticamente, falso para produccion
    }),
  ],
```
## Generar entidades

6. generamos un recurso
```bash
nest g res products --no-spec
```

7. definimos la entidad, con decoradores, ejemplo en products/entities/product.entity.ts

8. En el product.module.ts realizamos la importacion de la tabla con typeormmodule
```javascript
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
```

7. revisar que la tabla se genero gracias a las configuraciones en el app.module.ts
```javascript
autoLoadEntities: true, // carga las entidades automaticamente
      synchronize: true,
```

## DTO
1. instalar class validator
```bash
yarn add class-validator class-transformer
```

2. realizamos la configuracion de globalpipes en main.ts
```javascript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // eliminar datos que no estan en el dto
      forbidNonWhitelisted: true, // devolver error si hay datos que no estan en el dto
    })
  );
  await app.listen(3000);
}
bootstrap();
```

## INSERCIONES A LA BASE
1. acceder a la capa de servicios
2. Inyectar el repositorio
```javascript
constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
```
3. Guardar
__prestar atencion al .create y .save__
```javascript
async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      
      return product;
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Help meee`);
    }
  }
```
 ## Logs 
 1. Inicializamos
 ```javascript
   private readonly log = new Logger('ProductsService');
 ```
 2. usar
 ```javascript
  this.log.error(error);
 ```

 ## BeforeInsert
 1. Funciona en la entidad .entity
 ```javascript
  @BeforeInsert()
  checkSlugInsert() {
    if(!this.slug){
      this.slug = this.title;
    }

    this.slug =  this.slug.toLowerCase()
    .replaceAll(' ','_')
    .replaceAll("'",'');
  }
 ```

 ## DTO DE PAGINACION EN common

En los dtos se puede configurar el tipo de llegada con   
  ```javascript
  @Type(() => Number)
 ```
 ## validaciones de uuid

 1. Instalar uuid
```bash
yarn add uuid 
```
2. Instalar tipos de uuid en desarrollo
```bash
yarn add -D @types/uuid
```

## Query Builder
Construye un query con sintaxis sql
  ```javascript
  const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
      .where(`UPPER(title) =:title or slug =:slug`, {
        title: term.toUpperCase(),
        slug: term.toLowerCase()
      }
      ).getOne();
 ```

 ## Update a la base
```javascript
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
 ```

 ## Una nueva entidad

 __recuerda que es importante importar la entidad en el modulo que te encuentres, en este caso produc.module, en el typeorm__
 
```javascript
imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
  ],
})
```

## relaciones
varios a uno
```javascript
@ManyToOne(
    () => Product,
    (product) => product.images,
    
  )
  product: Product;
```
 
uno a varios
```javascript
@OneToMany(
    () => ProductImage,
    productImage => productImage.product,
    { cascade: true} // no recomendado
  )
  images?: ProductImage[];
```

## guardar imagenes del producto
recorremos las imagenes con map y las vamos procesando (create), el metodo save guardara todo
```javascript
const product = this.productRepository.create({...productDetails, images: images
        .map(image => this.productImageRepository.create({url: image}))}); // recorremos las imagenes y se crean unicamente las imagenes
      

      await this.productRepository.save(product);
```

## busqueda
find tiene una propiedad relations, donde llenas las relaciones, en este caso imagenes

```javascript
const product = this.productRepository.return await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true
      }
      // TODO: relaciones
    });
```


# ESTUDIAR EL EAGER RELATION
## eager 
permite devolver datos de la relacion, en este caso imagenes de los productos

1. en la entidad productos agregamos eager: true

__suficiente para find by id__
```javascript
@OneToMany(
    () => ProductImage,
    productImage => productImage.product,
    { cascade: true,
      eager: true,
    } // no recomendado
  )
  images?: ProductImage[];
```

## Query Runner
```
https://orkhan.gitbook.io/typeorm/docs/insert-query-builder
```

1. creamos la inyeccion de dependencias en el constructor
```javascript
private readonly dataSource: DataSource,
```
2. usamos el query runner

```javascript
const queryRunner = this.dataSource.createQueryRunner();
```    

## Query Runner
1. Creamos el query runner
2. arrancamos la transaccion con startTransaction
3. Realizamos una operacion ejemplo eliminacion, especificando el tipo y un ejemplo de busqueda
```javascript
await queryRunner.manager.delete( ProductImage, { product: {id: id}} );
```

__para guardar siempre es necesario procesar con create primero, esto no crea en la base de datos, solo procesa__

4. si todo es correcto (try) se realiza un await queryRunner.commitTransaction();

5. si algo fallo, catch await queryRunner.rollbackTransaction();

6. siempre finalizando con await queryRunner.release();

__ejemplo de lo anterior explicado__

```javascript
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
      
```

## Eliminacion en cascada...

__EN LA entidad hija se pone onDelete: Cascade__
```javascript
@ManyToOne(
    () => Product,
    (product) => product.images,
    { onDelete: 'CASCADE'}
```
