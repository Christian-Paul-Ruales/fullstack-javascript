export const pokemonIds = [1,20,30,12,66];
//pokemonIds.push('asda'); //ERROR: no se puede agregar un string a un array de numeros

//pokemonIds.push(+'1'); //Conversion de string a numeros

interface IPokemon {
    id: number;
    name: string;
    age?: number;
}

export const bulbasour: IPokemon= {
    id: 1,
    name: 'Bulbasor',

}
export const chamonder: IPokemon= {
    id: 1,
    name: 'Chamonder',
    age: 12
}

export const pokemons:IPokemon[] = [];

pokemons.push(bulbasour, chamonder);

console.log(pokemons)