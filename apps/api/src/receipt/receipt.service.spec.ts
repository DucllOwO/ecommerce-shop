import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptService } from './receipt.service';

describe('ReceiptService', () => {
  let service: ReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptService],
    }).compile();

    service = module.get<ReceiptService>(ReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all receipt should have returned', () => {
    expect(service.receipts({})).toHaveReturned();
  })
  
  it('get all receipt should have returned', () => {
    expect(service.receipt({id: 1})).toMatchObject({id: 1});
  })
});
