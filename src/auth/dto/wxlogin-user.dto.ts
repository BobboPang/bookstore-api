import { IsNotEmpty, IsString } from 'class-validator';
export class WxLoginUserDto {
  @IsNotEmpty()
  @IsString()
  openId: string;
}
