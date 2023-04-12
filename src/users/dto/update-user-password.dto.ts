import { IsNotEmpty, IsString } from 'class-validator';

export class UpdataUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  readonly rePassword: string;

  updatedAt: Date;
}
