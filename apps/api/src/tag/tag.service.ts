import { Injectable } from '@nestjs/common';
import { Prisma, Review, Tag, Discount, HaveTag } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async tag(
    tagWhereUniqueInput: Prisma.TagWhereUniqueInput,
  ): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where: tagWhereUniqueInput,
      include: {
        discount: true,
        HaveTag: {
          include: {
            product: true
          }
        }
      },
    });
  }

  async tags(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
    include?: Prisma.TagInclude;
  }): Promise<Tag[]> {
    const { skip, take, orderBy, include } = params;
    return this.prisma.tag.findMany({
      skip,
      take,
      orderBy,
      include,
    });
  }

  async createTag(data: Prisma.TagCreateInput): Promise<Tag> {
    return this.prisma.tag.create({
      data,
    });
  }

  async updateTag(params: {
    where: Prisma.TagWhereUniqueInput;
    data: Prisma.TagUpdateInput;
  }): Promise<Tag> {
    const { where, data } = params;
    return this.prisma.tag.update({
      where,
      data,
      include: { discount: true },
    });
  }

  async removeHaveTag(where: Prisma.HaveTagWhereUniqueInput): Promise<HaveTag> {
  return this.prisma.haveTag.delete({
    where,
  });
  }
  
  async removeTag(where: Prisma.TagWhereUniqueInput): Promise<Tag> {
    return this.prisma.tag.delete({
      where,
    });
  }
}
