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

