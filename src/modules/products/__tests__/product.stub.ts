import { type ProductStatus } from '../enums/product-status.enum';
import { Product } from '../schemas/product.schema';

export const productStub = (): Product => ({
  _id: '64850135bf8cd46e02eebd91',
  name: 'Asus Zenbook',
  price: 1000,
  status: 'Available' as ProductStatus,
  availableSince: new Date('2023-06-14T00:00:00.000+00:00'),
});
