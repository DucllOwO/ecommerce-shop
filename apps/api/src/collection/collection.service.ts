import { Injectable } from '@nestjs/common';
import { Collection, Prisma, Product_item } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) { }

  async collection(
    collectionWhereUniqueInput: Prisma.CollectionWhereUniqueInput,
  ): Promise<Collection | null> {
    return this.prisma.collection.findUnique({
      where: collectionWhereUniqueInput,
    });
  }

  async collections(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CollectionWhereUniqueInput;
    where?: Prisma.CollectionWhereInput;
    orderBy?: Prisma.CollectionOrderByWithRelationInput;
  }): Promise<Collection[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.collection.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async createCollection(data : Prisma.CollectionCreateInput) : Promise<Collection> 
  {
    return this.prisma.collection.create({
      data,
    })
  }

  async updateCollection(params: {
    where: Prisma.CollectionWhereUniqueInput,
    data: Prisma.CollectionCreateInput
  }) : Promise<Collection>
  {
    const {where, data} = params;
    return this.prisma.collection.update({
      where,
      data
    });
  }

  async removeCollection(where: Prisma.CollectionWhereUniqueInput) : Promise<Collection> {
    return this.prisma.collection.delete({
      where
    });
  }
}
