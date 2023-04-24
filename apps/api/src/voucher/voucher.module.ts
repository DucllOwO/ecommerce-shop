import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [VoucherController],
  providers: [VoucherService, PrismaService],
  exports: [VoucherService]
})
export class VoucherModule { }
