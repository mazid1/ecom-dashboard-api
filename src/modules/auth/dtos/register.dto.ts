import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
