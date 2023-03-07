import { Injectable } from '@nestjs/common';
import { Feedback, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) { }

  async feedback(
    feedbackWhereUniqueInput: Prisma.FeedbackWhereUniqueInput,
  ): Promise<Feedback | null> {
    return this.prisma.feedback.findUnique({
      where: feedbackWhereUniqueInput,
    });
  }

  async feedbacks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FeedbackWhereUniqueInput;
    where?: Prisma.FeedbackWhereInput;
    orderBy?: Prisma.FeedbackOrderByWithRelationInput;
  }): Promise<Feedback[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.feedback.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async createFeedback(data: Prisma.FeedbackCreateInput) : Promise<Feedback>{
    return this.prisma.feedback.create({
      data,
    });
  }

  async updateFeedback(params : {
    where : Prisma.FeedbackWhereUniqueInput, 
    data: Prisma.FeedbackCreateInput}) : Promise<Feedback>{
      const {where, data} = params
      return this.prisma.feedback.update({
        where, 
        data
    });
  }
}
