import { Injectable } from '@nestjs/common';
import { Importing, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImportService {
  constructor(private prisma: PrismaService) {}

  async importing(
    importingWhereUniqueInput: Prisma.ImportingWhereUniqueInput,
  ): Promise<Importing | null> {
    return this.prisma.importing.findUnique({
      where: importingWhereUniqueInput,
      include: {
        ImportDetail: true,
      },
    });
  }

  async importings(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ImportingWhereUniqueInput;
    where?: Prisma.ImportingWhereInput;
    orderBy?: Prisma.ImportingOrderByWithRelationInput;
  }): Promise<Importing[]> {
    const { skip, take, orderBy, where } = params;
    return this.prisma.importing.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        ImportDetail: {
          include: {
            Product_item: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }
  async createImporting(data: Prisma.ImportingCreateInput): Promise<Importing> {
    return this.prisma.importing.create({
      data,
    });
  }

  //   async updateImporting(params: {
  //     where: Prisma.ImportingWhereUniqueInput,
  //     data: Prisma.ImportingCreateInput
  //   }): Promise<Importing> {
  //     const { where, data } = params
  //     return this.prisma.importing.update({
  //       where,
  //       data
  //     });
  //   }
}
