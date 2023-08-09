import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import exp from 'constants';
import { Prisma } from '@prisma/client';

describe('ProductService', () => {
  let service: ProductService;

  const mockCreateProduct: Prisma.ProductCreateInput = {
    name: "Mock Product",
    price: 100,
    description: "This is a mock product",
    image: ["https://example.com/image.jpg"],
    view: 500,
    sold: 50,
    isActive: true,
    slug: "mock-product",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get products', () => {
    it('get all products should have returned', () => {
      expect(service.products({})).toHaveReturned();
    });
  
    it('get product with {id: 1} should have returned', () => {
      expect(service.product({id: 1})).toMatchObject({id: 1});
    })
  })

  describe('create product', () => {
    it('should create product', () => {
      expect(service.createProduct(mockCreateProduct)).toEqual({ id: expect.any(Number), ...mockCreateProduct});
    })
  })

});
