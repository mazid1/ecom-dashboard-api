import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductStatus } from '../enums/product-status.enum';
import { Price } from '../dtos/price.dto';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: Price,
    default: {
      amount: 0,
      currency: '$',
    },
  })
  price: Price;

  @Prop({
    default: ProductStatus.AVAILABLE,
  })
  status: ProductStatus;

  @Prop({
    default: new Date(),
  })
  availableSince: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
