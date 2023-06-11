import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;
  let productModel: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        { provide: getModelToken(Product.name), useValue: Model },
      ],
    }).compile();

    productModel = module.get<Model<Product>>(getModelToken(Product.name));
    productsService = module.get<ProductsService>(ProductsService);
    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('"findAll" should return an array of products', async () => {
    const result = new Promise<ProductDocument[]>((resolve) => resolve([]));
    jest.spyOn(productsService, 'findAll').mockImplementation(() => result);
    expect(await controller.findAll()).toEqual([]);
  });
});
