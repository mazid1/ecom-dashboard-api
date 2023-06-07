import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';
import { Price } from './price.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Price)
  price: Price;

  @IsOptional()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsOptional()
  @IsDateString()
  availableSince: Date;
}
