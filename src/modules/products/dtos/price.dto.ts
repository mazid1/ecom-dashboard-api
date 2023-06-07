import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Price {
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;
}
