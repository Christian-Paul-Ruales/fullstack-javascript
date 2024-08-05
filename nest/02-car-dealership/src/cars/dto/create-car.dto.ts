import { IsString } from 'class-validator';

export class CreateCarDto {
  @IsString({ message: `the brand is required` })
  readonly brand: string;

  @IsString()
  readonly model: string;
}
