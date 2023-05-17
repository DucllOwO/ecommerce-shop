import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Prisma } from '@prisma/client';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() createDiscountDto: Prisma.DiscountCreateInput) {
    return this.discountService.createDiscount(createDiscountDto);
  }

  @Get()
  findAll() {
    return this.discountService.discounts({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.discount({id: Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: Prisma.DiscountCreateInput) {
    return this.discountService.updateDiscount({
      where: {id: Number(id)},
      data: updateDiscountDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.discountService.removeDiscount({ id: Number(id) })
  }
}
