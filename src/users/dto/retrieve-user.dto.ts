import { IsString } from 'class-validator';

export class RetrieveUserDto {
  @IsString()
  id: string;
}
