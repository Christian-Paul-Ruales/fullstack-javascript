# src codigo
## Modulos
Agrupan y desacoplan un conjunto de funcionalidad especifica por dominio

ejemplo: modulo de autenticacion, maneje lo relacionado a autenticacion

**generar modulo**
```bash
nest g mo nombre
```

## Controladores
Controlan rutas, son encargados de escuchar la solicitud y emitir una respuesta

**generar controlador**
```bash
nest g co nombre
```

### Desactivar prettier
```bash
yarn remove prettier
```

Ver>paleta de comandos> Developer: reload windows

### decorador get
```bash
@Get(':id')
getCarById(@Param('id') id: string) {
```

* @Get para realizar peticion get
* @Param para recoger el parametro de la url

## Servicios
Alojan la logica del negocio

Todos los servicios son providers

**generar servicios**
```bash
nest g s nombre
```
* se puede agregar la bandera --no-spec para no generar los archivos de pruebas

## Pipes
Transforma la data recibida en requests, para asegurar un tipo, valor o instancia de un objeto

metodos de parametros reciben pipes
```bash
@Get(':id')
getCarById(@Param('id', ParseIntPipe) id: number ...
```
**documentacion de statuscode en peticiones http:**
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

## Exception Filters
Maneja los errores de codigo en mensajes de respuesta http

throw new etc etc

## UUID 
IDs unicas, para generarlo es necesario instalar el paquete uuid
```bash
yarn add uuid
```
para instalar los tipos se debe hacer en modo desarrollo con el -D
```bash
yarn add -D @types/uuid
```

## modificacion de pipes
se puede instanciar los pipes, enviando un objeto con las modificaciones

```bash
getCarById(@Param('id',new ParseUUIDPipe({version: '4'})
```

## DTO (Data Transfer Object)
Objeto de transferencia de datos
```bash
export class CreateCarDto {
  readonly brand: string;
  readonly model: string;
}
```

## Class validator y Class transformer
Instalar 
```bash
yarn add class-validator class-transformer
```

En el controlador aprender a usar **a nivel de controlador**
```bash
@UsePipes(ValidationPipe)
``` 

Tambien lo puedes hacer a nivel globaL en main **ES LO MAS RECOMENDADO**

```bash
app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true /** solo deja la data que espera*/,
      forbidNonWhitelisted: true /** no permite ingresar data no esperada*/,
    }),
  );
``` 

## Decoradores en dto
```bash
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;
  @IsString({ message: `the brand is required` })
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()
  readonly model?: string;
```

## Archivo de exportacion
un index en las carpetas, exportando los archivos

luego importamos las carpeta

# Resource
Genera todos los recursos
```bash
nest g res brands
```
o sin archivo de pruebas
```bash
nest g res brands --no-spec
```

1. REST API
2. CRUD ENTRY POINTS (Y) 

## DTOs extends PartialType(CreateBlaDto)
hace que todas las propiedades sean opcionales 

## SEED semillas de desarrollo
```bash
nest g res seed --no-spec
```
1. borrar dtos y entities (no se van a ocupar)
2. En el controller dejamos solo el metodo @Get y lo renombramos runSeed
3. Creamos los seeds.seed.ts en una carpeta dentro del recurso seed
4. exportamos el arreglo de datos
5. Crear metodos en los services que necesitamos setear los arrays
```bash
fillBrandsWithSeedData(brands: Brand[]) {
  this.brands = brands;
}
```
## Inyectar servicios en otros servicios, (continuamos con el proceso anterior)
6. Exportamos desde el modulo el servicio que deseamos
```bash
@Module({
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService], // exportamos en modulos
})
```
7. Importamos en el modulo Seed. el modulo que deseamos importar
```bash
@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CarsModule],
})
```

