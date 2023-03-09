import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async order(
    receiptWhereUniqueInput: Prisma.ReceiptWhereUniqueInput,
  ): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: receiptWhereUniqueInput,
    });
  }

  async orders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.order.findMany({
      skip,
      take,
      orderBy,
    });
  }
  async createOrder(data: Prisma.OrderCreateInput) : Promise<Order>{
    return this.prisma.order.create({
      data,
    });
  }

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput,
    data: Prisma.OrderCreateInput
  }) : Promise<Order>{
    const {where, data} = params
    return this.prisma.order.update({
      where,
      data
    });
  }
}
