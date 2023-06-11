import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getModelToken(Product.name), useValue: Model },
      ],
    }).compile();

    productModel = module.get<Model<Product>>(getModelToken(Product.name));
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
