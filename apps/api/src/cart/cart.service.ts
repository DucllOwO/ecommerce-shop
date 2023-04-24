import { Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }

  async cart(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
  ): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: cartWhereUniqueInput,
    });
  }

  // async carts(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.CartWhereUniqueInput;
  //   where?: Prisma.CartWhereInput;
  //   orderBy?: Prisma.CartOrderByWithRelationInput;
  // }): Promise<Cart[]> {
  //   const { skip, take, orderBy } = params;
  //   return this.prisma.cart.findMany({
  //     skip,
  //     take,
  //     orderBy,
  //   });
  // }
  
  async createCart(data: Prisma.CartCreateInput) : Promise<Cart>{
    return this.prisma.cart.create({
      data,
    });
  }

  async updateCart(params: {
    where: Prisma.CartWhereUniqueInput,
    data: Prisma.CartCreateInput
  }): Promise<Cart> {
    const { where, data } = params;
    return this.prisma.cart.update({
      where,
      data
    });
  }
}
