import { IsNotEmpty, IsString } from 'class-validator';

export class UpdataUserAvatarDto {
  @IsNotEmpty()
  @IsString()
  readonly avatar: string;

  updatedAt: Date;
}
