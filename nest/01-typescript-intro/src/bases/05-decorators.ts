
class NewPokemon {
    constructor (
        public readonly id: number,
        public name: string,
    ) {}

    scream (){
        console.log(`I dont scream`);
    }

    speak(){
        console.log(`I dont speak`);
    }
}

/** Decoradores */
/**
 * 
 * Acabo de sobreescribir donde se usa myDecoretor, y le puse la de newPokemon
 */
const MyDecorator = () => {
    /**
     * target: generalmente una clase pero se define de tipo funcion
     */
    return (target: Function) => {
        return NewPokemon;
    }
}
@MyDecorator()
export class Pokemon {
    constructor (
        public readonly id: number,
        public name: string,
    ) {}

    scream (){
        console.log(`${this.name.toUpperCase()}`);
    }

    speak(){
        console.log(`${this.name}, ${this.name}`);
    }
}

export const charmander = new Pokemon(1, '2sad');
charmander.speak();
charmander.scream();