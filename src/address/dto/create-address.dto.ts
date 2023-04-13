import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  id: string;
  
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  receiveName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
