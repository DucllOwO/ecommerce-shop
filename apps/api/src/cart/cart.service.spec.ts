import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get cart should have returned', () => {
    expect(service.cart({id: 1})).toHaveReturned();
  })

  it('post cart should have returned', () => {
    expect(service.createCart({owner: {connect: {id: '079202011909'}}})).toHaveReturned();
  })
  
});
