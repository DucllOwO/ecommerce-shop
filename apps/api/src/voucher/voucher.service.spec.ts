import { Test, TestingModule } from '@nestjs/testing';
import { VoucherService } from './voucher.service';

describe('VoucherService', () => {
  let service: VoucherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoucherService],
    }).compile();

    service = module.get<VoucherService>(VoucherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all method', () => {
    expect(service.vouchers({})).toHaveReturned();
  })

  // it('get one method', () => {
  //   expect(service.voucher("000001")).toHaveReturnedWith({})
  // })
});
