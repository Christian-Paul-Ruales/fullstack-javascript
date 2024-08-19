# DESARROLLO
## Pagina estatica 
1. creamos en la raiz del proyecto, el folder public
2. creamos un html
3. Instalamos la libreria serve-static
```bash
yarn add @nestjs/serve-static
```
4. en el app module, en imports agregamos el siguiente codigo
```bash
ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    })
```
viendose algo asi
```bash
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    })
  ],...
```
## prefijo global

en el main.ts
```bash
const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // prefijo de la app global
  // antes del app.listen
  await app.listen(3000);
```

## MongoDB con docker

### instalar docker desktop
```
Estoy usandolo con christianruales@gmail.com
```
```
https://docs.docker.com/desktop/install/ubuntu/
```

### Creamos el archivo docker-compose-dev.yaml en la carpeta raiz del sistema

```bash
docker compose -f docker-compose-dev.yaml up -d
```

## para conectarse usaremos tableplus



## Conexion a mongoDB
para este caso con mongose

```
https://docs.nestjs.com/techniques/mongodb
```

1. Instalamos los paquetes(leer siempre la doc primero)
```bash
yarn add @nestjs/mongoose mongoose
```
2. Agregar la conexion al app.module.ts(leer documentacion)
```
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot('mongodb://localhost/nest-pokemon'),
```

3. Dejar la entidad como pokemon.entity.ts en caso de ser mongo
4. EN el paso anterior se creo una entidad y se agrego a un esquema, para el paso actual, se procede a agregar al modulo actual, en este caso Pokemon las siguientes importaciones

```
@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    MongooseModule.forFeature(
      [
        {
          name: Pokemon.name,
          schema:PokemonSchema,
        }
      ]
    ),
  ]...
```

## Insercion a la base,
despues de crear el dto tal cual como indica la documentacion, y con las validaciones vistas en la unidad 2 seguimos los siguientes pasos

1. En el archivo service inyectamos el modelo (con la entidad)
```
constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ){}
```

2. cambiamos el metodo de creacion a metodo asincrono y usamos el modelo para guardar los datos

```bash
async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    const pokemon = await this.pokemonModel.create(createPokemonDto);
    return pokemon;
  }
```

## Codigo de error
```
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
```

En el controlador pueden usar esto para generar los mensajes de status
```
  @HttpCode(HttpStatus.CREATED)
```

ejemplo de manejo y busqueda
```bash
let pokemon: Pokemon; //pokemon tipo entity pokemon
    // si es un numero busca por no
    if(!isNaN(+id)){
      pokemon = await this.pokemonModel.findOne({no: id});
    }
    // si es un id de mongo busca por id
    if(!pokemon && isValidObjectId(id)){
      pokemon = await this.pokemonModel.findById(id);
    }
    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({name: id});

    } 
    if( !pokemon) throw new NotFoundException(`Pokemon whit id, name or no ${id} not found`);
    
```

## CustomPipes

1. Crear un modulo common (si no existe)
```bash
nest g mo common
```

2. Generamos el Pipe
```bash
nest g pi common/pipes/parseMongoId --no-spec
```

3. el metodo transform de pipe recibe dos datos, el value es el que nos permite transformar la data, para este caso validar que el dato recibido sea un id de mongo

```bash
transform(value: string, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    if(!isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid mongo id`);
    }
    return value.toUpperCase();
  }
```

## SEED

1. Generamos el resource seed
```bash
nest g res seed --no-spec
```
2. eliminamos los dtos y entities
3. dejamos solo un metodo get en el controller y un metodo en el service

4. Instalaremos axios, 
```bash
yarn add axios
```

**si el mismo genera un problema instalar la version menor**

```bash
yarn add axios@0.27.2 o npm install axios@0.27.2.
```

5. en el metodo en seedService, agregamos una insercion masiva
***el borrado masivo elimina todos los datos de la tabla***
```javascript
async executeSeed() {
    /**
     * Delete * from pokemons
     * NO RECOMENDADO: ESTO BORRA TODOS LOS DATOS DE LA TABLA, SOLO EN PRUEBAS
     */
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    const pokemonToInsert: {name: string; no: number}[] = [];

    data.results.forEach(
      async({name, url}) => {
        const segments = url.split('/');
        const no = +segments[segments.length -2];
        
        pokemonToInsert.push({name, no});
      }
    );

    await this.pokemonModel.insertMany(pokemonToInsert);
 
    return `Seed executed succesfully`;
  }

```

6. para insertar nos vamos al metodo seed
```
http://localhost:3000/api/v2/seed
```


## Mejor manera de cameiar
Usar un adaptador con su respectiva interfaz, tal cual como common/adapters/httpAdapter

## variables de entorno
1. crear el archivo .env en la raiz del proyecto

2. agregar las variables de entorno
```properties
MONGODB=mongodb://localhost/nest-pokemon
PORT=3001
```

3. instalar paquete
```bash
yarn add @nestjs/config
```

3. En el app.module.ts importar en primera ubicacion 
```javascript
ConfigModule.forRoot()
```
4. REARRANCAR LA APP
5. Usar  las variables de entorno desde procces.env.VARIABLE_ENTORNO
```javascript
    MongooseModule.forRoot(process.env.MONGODB), // conexion con base de datos mongo
```

**a veces es necesario reiniciar la ejecucion de la app**

## Para evitar problemas con acualizaciones
1. crear una carpeta config en la carpeta src
2. crear un archivo app.config.ts, tambien llamado env.config.ts en algunos casos
3. realizar la configuracion de variables en una funcion flecha
```javascript
export const EnvConfigurarion = () => 
  ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: process.env.DEFAULT_LIMIT || 10,
  })
  
```
4. en el app.module.ts configuramos el config module root app, en load el archivo donde se encuentra la funcion
```javascript
imports: [
    ConfigModule.forRoot(
      {
        load: [EnvConfigurarion],
      }
    ), // debe ir primero
  
```

5. Importar config module en el pokemon module
```javascript
 imports:[
    ConfigModule,
```

6. Inyectar el servicio de configserver en el service que desea usar
```javascript
constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ){

```
7. Ahora podemos usarlo en nuestro service, mediante el metodo get<TipoDato>
**La variable default limit fue inicializada como atributo private**
```javascript
this.defaultLimit = this.configService.get<number>('defaultLimit');
```

**NOTA:** config server esta fuera del alcance de main

## joi 
no usar happy joi, solo joi
1. instalar joi
```bash
yarn add joi
```
2. crear el archivo joi.validation.ts en la carpeta config
realizar la importacion en ese archivo de esta manera

```javascript
import * as Joi from 'joi';
```  
3. Realizar las validaciones como se muestra a continuacion
```javascript
import * as Joi from 'joi';

// validamos las variables de entorno
export const JoiValidationSchema = Joi.object(
  {
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DAFAULT_LIMIT: Joi.number().default(6),
  }
);
``` 

4. en el appmodule, agregar el JoiValidationSchema como validationSchema

```javascript
  imports: [
    ConfigModule.forRoot(
      {
        load: [EnvConfigurarion],
        validationSchema: JoiValidationSchema,
      }
```
**primero se ejecuta el esquema de validacion, despues el siguiente, los valores se generan con string**

5. en el environment configuration (app.config.ts), validar el tipo de datos

notese el + en la propiedad defaultLimit
```javascript
export const EnvConfigurarion = () => 
  ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 10,
  })
```

## env ejemplo .env.template
para poder usarlo renombramos ya que el .env no se sube a github

# base de datos a prod
```
https://railway.app/

```
```
https://www.mongodb.com/
```
1. creamos un proyecto vacio en railway
2. realizamos unos cambios en el codigo para nombre de la base dedatos
3. esas modificaciones se realizaran en app.module.ts, en el MongooseModule, ponemos el nombre de la base de datos
```javascript
MongooseModule.forRoot(process.env.MONGODB, 
      {dbName: 'pokemonsdb'}
    ),
```
4. Corremos el seed
```javascript
http://localhost:3001/api/v2/seed
```

# Ejecutar el app en produccion
DESPLEGAR EN LA NUVE...
1. CAMBIAR EL COMANDO DE START, POR EL DE START:PROD EN EL PACKAGE.JSON
2. configurar variables de entorno
3. redeployar
# start:prod
aprender amazon web services