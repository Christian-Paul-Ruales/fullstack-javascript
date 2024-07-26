## objects 
# objeto en javascript
let flash = {
        name: 'Barry alien',
        age: 25,
        powers: ['Super velocidad','Es blanco'],

    };
# tipos especificos
definimos el tipo de datos despues de declarar la variable con cada uno de los elementos, al igual que podemos meter un valor opcional con ?

let flash: { name:string, age?: number, powers: string[] } = {
            name: 'Barry alien',
            age: 25,
            powers: ['Super velocidad','Es blanco'],
        };


# metodos en los objetos
Atencion a lo que dice getName
let flash: { name:string, age?: number, powers: string[], getName?: ()=> string } = {
            name: 'Barry alien',
            age: 25,
            powers: ['Super velocidad','Es blanco'],
            getName() {
                return this.name;
            },
        };

## TIPOS PERSONALIZADOS
usamos la palabra type para crear tipos personalizados

type Hero = {
            name:string;
            age?: number;
            powers: string[]; 
            getName?: ()=> string
        }

Y se puede usar en las variables como cualquier tipo
let flash: Hero