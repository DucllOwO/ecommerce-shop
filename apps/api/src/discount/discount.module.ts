import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DiscountController],
  providers: [DiscountService, PrismaService],
  exports: [DiscountService]
})
export class DiscountModule {}
