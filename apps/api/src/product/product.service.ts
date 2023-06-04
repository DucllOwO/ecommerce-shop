import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
      include: {
        Product_item: true
      }
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, orderBy, where } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      orderBy,
      where,
      include: {
        Product_item: true,
        HaveTag: {
          include: {
            tag: true
          }
        }, 
        collection: true,
        discount: true,
      }
    });
  }
  async createProduct(data: Prisma.ProductCreateInput) : Promise<Product>
  {
    console.log(data);
    return this.prisma.product.create({
      data: {...data},
    })
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }) : Promise<Product>
  {
    const { where, data } = params;
    console.log(data);
    return this.prisma.product.update({
      data,
      where,
    });
  }
}
