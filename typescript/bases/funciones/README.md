### funciones

# Argumentos opcionales y requeridos
en este ejemplo firstname es obligatorio, y lastname al tener el ? es opcional, y para que no se muestre undefined podemos usar el || en el parametro opcional

const fullName = (firstname: string, lastname?: string): string => {
            return `${firstname} ${lastname || 'no'}`;
        }

## Tipo Funcion
se puede definir el tipo de dato de una variable como funcion

let myFunction: Function;

he incluso especificar los argumentos y valores de retorno

let exampleF: (a: number, b:number) => number;
