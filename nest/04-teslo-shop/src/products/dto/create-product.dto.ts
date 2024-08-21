import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString({each: true}) // cada uno de los elementos del array sea un string
  @IsArray()
  sizes: string[];
  
  @IsIn(['men','women','kid','unisex'])
  gender: string;

  @IsString({
    message: '{value} no es un string',
    each: true
  })
  @IsArray()
  @IsOptional()
  tags: string[];

}
