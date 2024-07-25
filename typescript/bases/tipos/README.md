## TIPOS
# NaN es considerado un numero en javascript

# Null check ?
el signo de interrogaccion antes del punto
batman[10]?.toUpperCase()

tambien puedes usar || como un caso contrario

# RECOMENDACIONES NO USAR ANY
any es decirle a typescript que se olvide un poco de los tipos de datos

# Casteo de un dato
( nombreVariable as tipoDato )

ejemplo queriendo usar un metodo
(avenger as string).charAt(0);

otra manera de castear es <tipoDato> nombreVariable

<number>avenger.toFixed();

# definicion de tipos de dato multiple
se usa el parentesis
const dato: (tipo1| tipo2 | ...) = valor;

ejemplo:
const number: (string | number | boolean)[] =[1,2,3,'4',5,6];

## TUPLAS
pueden ser trios, cuartetos, quintetos etc,
el tipo de dato se define con []

const dato: [tipo1,tipo2,...] = [valortipo1, valortipo2, ...];

ejemplo:

const hero: [string, number, boolean] = ['Dr Extraño', 100, true];

# Enumeraciones
enum AudioLevel {
        min = 1,
        medium,
        max = 10
    } 

# void significa vacio, nu hay valor de retorno

definicion de tipo de datos en una funcion despues del parentesis

function callBatman(): void{
            return;
        }

        const callSuperman = (): void => {
            return;
        }

## NEVER
never no debe terminar exitosamente

si miras una funcion asi sabes que no se continuara el codivo

# undefined
strictNullChecks en tsconfig en false (NO RECOMENDADO) nos permite declarar tipos de dato boolean por ejemplo, coomo undefined

let val: boolean = undefined;

NULL NO ES IGUAL A UNDEFINED
