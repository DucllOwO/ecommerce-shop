import { HelperModule } from './../helper/helper.module';
import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [HelperModule],
  controllers: [VoucherController],
  providers: [VoucherService, PrismaService],
  exports: [VoucherService]
})
export class VoucherModule { }
