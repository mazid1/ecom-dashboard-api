import { IsNotEmpty, IsString } from 'class-validator';

export class TokenPayloadDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
