import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FeedbackService } from './feedback.service';


@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() createFeedbackDto: Prisma.FeedbackCreateInput) {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @Get()
  findAll() {
    return this.feedbackService.feedbacks({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.feedback({id: Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackDto: Prisma.FeedbackCreateInput) {
    return this.feedbackService.updateFeedback({
      where: {id: Number(id)},
      data: updateFeedbackDto
    });
  }
}
