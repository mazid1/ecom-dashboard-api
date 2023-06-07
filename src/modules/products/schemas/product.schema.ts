import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductStatus } from '../enums/product-status.enum';
import { HydratedDocument } from 'mongoose';
import { Price } from '../dtos/price.dto';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
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
