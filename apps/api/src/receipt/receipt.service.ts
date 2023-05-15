import { Injectable } from '@nestjs/common';
import { Prisma, Receipt } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReceiptModule } from './receipt.module';

@Injectable()
export class ReceiptService {
  constructor(private prisma: PrismaService) { }

  async receipt(
    receiptWhereUniqueInput: Prisma.ReceiptWhereUniqueInput,
  ): Promise<Receipt | null> {
    return this.prisma.receipt.findUnique({
      where: receiptWhereUniqueInput,
    });
  }

  async receipts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReceiptWhereUniqueInput;
    where?: Prisma.ReceiptWhereInput;
    orderBy?: Prisma.ReceiptOrderByWithRelationInput;
  }): Promise<Receipt[]> {
    const { skip, take, orderBy, where } = params;
    return this.prisma.receipt.findMany({
      where,
      skip,
      take,
      orderBy,
      include:{
        buyer: true
      }
    });
  }

  async createReceipt(data: Prisma.ReceiptCreateInput): Promise<Receipt> {
    return this.prisma.receipt.create({
      data,
    });
  }


  async updateReceipt(params: {
    where: Prisma.ReceiptWhereUniqueInput,
    data: Prisma.ReceiptCreateInput
  }): Promise<Receipt> {
    const { where, data } = params;
    return this.prisma.receipt.update({
      where,
      data
    });
  }
}
