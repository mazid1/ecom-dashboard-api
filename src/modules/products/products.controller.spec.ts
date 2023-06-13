import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productStub } from './__tests__/product.stub';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([productStub()]),
            findById: jest.fn().mockResolvedValue(productStub()),
            create: jest.fn().mockResolvedValue(productStub()),
            update: jest.fn().mockResolvedValue(productStub()),
            delete: jest.fn().mockResolvedValue(productStub()),
            deleteMany: jest.fn().mockResolvedValue({
              acknowledged: true,
              deletedCount: 1,
            }),
          },
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when findAll called', () => {
    const expectedResponse = [productStub()];
    let actualResponse;

    beforeEach(async () => {
      jest.spyOn(productsService, 'findAll');
      actualResponse = await controller.findAll();
    });

    it('then it should call the productsService.findAll', () => {
      expect(productsService.findAll).toBeCalled();
    });

    it('then it should return an array of products', () => {
      expect(actualResponse).toEqual(expectedResponse);
    });
  });
});
