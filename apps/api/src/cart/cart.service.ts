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

  async carts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CartWhereUniqueInput;
    where?: Prisma.CartWhereInput;
    orderBy?: Prisma.CartOrderByWithRelationInput;
  }): Promise<Cart[]> {
    const { skip, take, orderBy, where } = params;
    return this.prisma.cart.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        product_item: {
          include: {
            product: true
          }
        }
      }
    });
  }
  
  async createCart(data: Prisma.CartCreateInput) : Promise<Cart>{
    return this.prisma.cart.create({
      data,
    });
  }

  async updateCart(params: {
    where: Prisma.CartWhereUniqueInput,
    data: Prisma.CartUpdateInput
  }): Promise<Cart> {
    const { where, data } = params;
    return this.prisma.cart.update({
      where,
      data
    });
  }

  async deleteCart(params: {
    where: Prisma.CartWhereUniqueInput
  }): Promise<Cart>{
    const { where } = params;
    // console.log(where)
    return this.prisma.cart.delete({
      where
    })
  }
}
