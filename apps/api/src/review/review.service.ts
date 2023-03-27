import { Injectable } from '@nestjs/common';
import { Prisma, Review } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }

  async review(
    reviewWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Review | null> {
    return this.prisma.review.findUnique({
      where: reviewWhereUniqueInput,
    });
  }

  async reviews(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReviewWhereUniqueInput;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput;
  }): Promise<Review[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.review.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async createReview(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.prisma.review.create({
      data,
    })
  }

  async updateReview(params: {
    where: Prisma.ReviewWhereUniqueInput,
    data: Prisma.ReviewCreateInput
  }): Promise<Review> {
    const { where, data } = params;
    return this.prisma.review.update({
      where,
      data
    });
  }

  async removeReview(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
    return this.prisma.review.delete({
      where
    });
  }
}
