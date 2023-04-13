import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  avatar: string;

  roles: string[];

  intro: string;

  // @IsBoolean()
  // status: boolean;

  updatedAt: Date;
}
