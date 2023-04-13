import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateUserDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  account: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  avatar: string;

  roles: string[];

  intro: string;

  // @IsBoolean()
  // status: boolean;

  createdAt: Date;

  updatedAt: Date;
}
