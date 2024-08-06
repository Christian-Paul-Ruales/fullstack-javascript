import { IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MinLength(1, { message: 'Minimun 1 character' })
  name: string;
}
