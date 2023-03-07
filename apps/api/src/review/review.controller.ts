import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ReviewService } from './review.service';


@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: Prisma.ReviewCreateInput) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.reviews({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.review({id: Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: Prisma.ReviewCreateInput) {
    return this.reviewService.updateReview({
      where: {id: Number(id)},
      data: updateReviewDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.removeReview({id: Number(id)});
  }
}
