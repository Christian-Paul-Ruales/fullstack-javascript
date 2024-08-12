import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';
export class CreatePokemonDto {
  // entero, positivo, minimo 1
  @IsInt({message: `No. is a number type`})
  @IsPositive()
  @Min(1, {message: `No. requiere a positive number, diferent to zero`})
  no: number;
  //string, y minlength 1
  @IsString({message: `Name require a string`})
  @MinLength(1,{message:`Name require 1 character minimun`})
  name: string;
}
