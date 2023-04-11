import { Injectable } from '@nestjs/common';
import { Prisma, Product_item } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductItemService {
  constructor(private prisma: PrismaService) { }

  async productItem(
    productItemWhereUniqueInput: Prisma.Product_itemWhereUniqueInput,
  ): Promise<Product_item | null> {
    return this.prisma.product_item.findUnique({
      where: productItemWhereUniqueInput,
    });
  }

  async productItems(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Product_itemWhereUniqueInput;
    where?: Prisma.Product_itemWhereInput;
    orderBy?: Prisma.Product_itemOrderByWithRelationInput;
  }): Promise<Product_item[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.product_item.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async createProductItem(data : Prisma.Product_itemCreateInput) : Promise<Product_item> 
  {
    return this.prisma.product_item.create({
      data,
    })
  }

  async updateProductItem(params: {
    where: Prisma.Product_itemWhereUniqueInput,
    data: Prisma.Product_itemCreateInput
  }) : Promise<Product_item>
  {
    const {where, data} = params;
    return this.prisma.product_item.update({
      where,
      data
    });
  }

  async removeProductItem(where: Prisma.Product_itemWhereUniqueInput) : Promise<Product_item> {
    return this.prisma.product_item.delete({
      where
    });
  }
}
