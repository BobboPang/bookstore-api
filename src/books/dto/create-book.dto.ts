import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  score: number;
}
