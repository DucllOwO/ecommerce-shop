import { Injectable } from '@nestjs/common';
import { Prisma, Discount } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class DiscountService {
  constructor(private prisma: PrismaService) { }

  async discount(
    discountWhereUniqueInput: Prisma.DiscountWhereUniqueInput,
  ): Promise<Discount | null> {
    return this.prisma.discount.findUnique({
      where: discountWhereUniqueInput,
    });
  }

  async discounts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DiscountWhereUniqueInput;
    where?: Prisma.DiscountWhereInput;
    orderBy?: Prisma.DiscountOrderByWithRelationInput;
  }): Promise<Discount[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.discount.findMany({
      skip,
      take,
      orderBy,
    });
  }
  createDiscount(data: Prisma.DiscountCreateInput): Promise<Discount> {
    return this.prisma.discount.create({
      data
    });
  }

  updateDiscount(params: {
    where: Prisma.DiscountWhereUniqueInput,
    data: Prisma.DiscountCreateInput
  }): Promise<Discount> {
    const { where, data } = params
    return this.prisma.discount.update({
      where,
      data,
    });
  }

  async removeDiscount(where: Prisma.DiscountWhereUniqueInput) : Promise<Discount> {
    return this.prisma.discount.delete({
      where
    });
  }
}
