// tipos y bases sobre modulos

export let name: string = 'Christian';
export const age: number = 28;
export const isValid: boolean = true;

export const templateString = `esto es un string
multilinea con " o con ' incluso inyectar
valores asi ${name}
expresiones se pueden hacer ${1 + 1}
o incluso boleanos ${isValid}`;

console.log(templateString);