import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async order(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
  ): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: orderWhereUniqueInput,
      include:{
        buyer: true,
        Order_detail: {
          include: {
            product_item: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });
  }

  async orders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, orderBy, where } = params;
    return this.prisma.order.findMany({
      where,
      skip,
      take,
      orderBy,
      include:{
        buyer: true,
        Order_detail: {
          include: {
            product_item: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });
  }
  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({
      data,
    });
  }

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput,
    data: Prisma.OrderCreateInput
  }): Promise<Order> {
    const { where, data } = params
    return this.prisma.order.update({
      where,
      data
    });
  }
}
