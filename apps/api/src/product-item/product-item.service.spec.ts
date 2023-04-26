import { Test, TestingModule } from '@nestjs/testing';
import { ProductItemService } from './product-item.service';

describe('ProductItemService', () => {
  let service: ProductItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductItemService],
    }).compile();

    service = module.get<ProductItemService>(ProductItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all product_item should have returned', () => {
    expect(service.productItems({})).toHaveReturned();
  });

  it('get product_item with id: 1 should match object', () => {
    expect(service.productItem({id: 1})).toMatchObject({id: 1});
  })
});
