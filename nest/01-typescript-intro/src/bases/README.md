# BASES DE TYPESCRIPT

## bases
conversion rapida de string a numero 
    *pokemonIds.push(+'1');*

## Interfaz
similar a los tipos

    interface IPokemon {
        id: number;
        name: string;
        age?: number;
    }
y se usa de la misma manera que un tipo
    export const bulbasour: IPokemon= ...

## Clase definida de manera explicita
export class Pokemon {
	public id:number;
	public name:string;

	constructor(id: number, name: string){
		this.id = id;
		this.name = name;
		console.log('Constructor llamado (como mi abogado)');
	}

}

**readonly:** evita que cambie despues de definido una propiedad 

## Getter en las clases

	get imageUrl():string{
		return `https://pokemon/${this.id}.png`;
	}

## Funciones en las clases
sin modificador de acceso, se vuelve public

	scream(){
		console.log(`${this.name.toUpperCase()} !!!`);
	}
## Promesa
Compromiso de notificacion cuando la promesa se cumpla

## Axios
Paquete que ayuda con las peticiones http
	*yarn add axios*

## async y await
async crea un metodo asincrono de ejecucion, que retorna una promesa

await espera la ejecucion de la promesa y solo se ejecuta dentro del metodo async

# Axios
## get

**se puede usar casteo**
	*axios.get<PokeapiResponse>*

Es recomendable generar interfaces para poder castear la respuesta, con paste json as code

 *const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');*


## generics
igual que en java, con los metodos
get<T>

ejemplo de una funcion
	async get<T>( url: string): Promise<T>{
        const { data } = await this.axios.get<T>(url);
        return data;
    }

## implements, principio de sustitucion de liskov
Crear interfaces e instanciar a la misma
para usar a todas las que solicitan 
ejemplo en ../api/pokeApi.adapters

## Decoradores
Funcion que tienen acceso a la definicion de donde se use, sea clase, metodo entre otros
se definen con @NombreDecorador y existen para metodos,clases etc etc

**se recomienda ir al archivo tsconfig.json**
si no existe la opcion     "experimentalDecorators": true,
debe agregarla dentro de compilerOptions