import { Injectable } from '@nestjs/common';
import { Prisma, Review, Tag } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) { }

  async tag(
    tagWhereUniqueInput: Prisma.TagWhereUniqueInput,
  ): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where: tagWhereUniqueInput,
      include: {
        Product: true
      }
    });
  }

  async tags(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
  }): Promise<Tag[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.tag.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async createTag(data : Prisma.TagCreateInput) : Promise<Tag> 
  {
    return this.prisma.tag.create({
      data,
    })
  }

  async updateTag(params: {
    where: Prisma.TagWhereUniqueInput,
    data: Prisma.TagCreateInput
  }) : Promise<Tag>
  {
    const {where, data} = params;
    return this.prisma.tag.update({
      where,
      data
    });
  }

  async removeTag(where: Prisma.TagWhereUniqueInput) : Promise<Tag> {
    return this.prisma.tag.delete({
      where
    });
  }
}
