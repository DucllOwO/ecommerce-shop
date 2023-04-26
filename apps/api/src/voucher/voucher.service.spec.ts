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

  it('get all voucher should have returned', () => {
    expect(service.vouchers({})).toHaveReturned();
  });

  it('get voucher should have returned', () => {
    expect(service.voucher({code: "09301"})).toMatchObject({code: "09301"});
  });

  // it('get one method', () => {
  //   expect(service.voucher("000001")).toHaveReturnedWith({})
  // })
});
