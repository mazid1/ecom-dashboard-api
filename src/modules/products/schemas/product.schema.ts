import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { ProductStatus } from '../enums/product-status.enum';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    default: ProductStatus.Available,
  })
  status: ProductStatus;

  @Prop({
    default: new Date(),
  })
  availableSince: Date;

  // todo: add category field
}

export const ProductSchema = SchemaFactory.createForClass(Product);
