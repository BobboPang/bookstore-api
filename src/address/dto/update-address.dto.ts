import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';
import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @IsString()
  receiveName: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;
}
