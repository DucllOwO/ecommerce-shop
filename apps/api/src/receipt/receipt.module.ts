import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService, PrismaService],
  exports: [ReceiptService]
})
export class ReceiptModule { }
