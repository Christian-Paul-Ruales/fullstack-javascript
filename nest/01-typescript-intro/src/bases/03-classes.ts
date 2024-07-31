import axios from 'axios';
import { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';
import { name } from './01-types';

// Clase definida de manera corta 
export class Pokemon {

	constructor(
		public readonly id: number,
		public name: string
	){}
	//geter
	get imageUrl():string{
		return `https://pokemon/${this.id}.png`;
	}

	// metodo
	scream():void{
		console.log(`${this.name.toUpperCase()} !!!`);
	}
	
	speak(){
		console.log(`${this.name}, ${this.name}`);
	}

	// metodo asincrono
	// no recomendable
	async getMoves(): Promise<Move[]>{
		//https://pokeapi.co/api/v2/pokemon/4
		const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
		console.log(data.moves[0].move.name.toUpperCase());
		return data.moves;
	}

}	

// instanciar una clase 
export const charmander = new Pokemon(1, 'Charmander');

console.log(charmander);
charmander.speak();
charmander.scream();
charmander.getMoves();