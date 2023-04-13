import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsString()
  name: string;

  @IsString()
  author: string;

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
