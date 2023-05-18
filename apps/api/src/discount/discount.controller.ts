import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
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
    if (!id)
      throw new BadRequestException();
    
    return this.discountService.discount({id: Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDiscountDto: Prisma.DiscountUpdateInput) {
    if (isNaN(id))
      throw new BadRequestException();
    
    return this.discountService.updateDiscount({
      where: {id: Number(id)},
      data: {...updateDiscountDto, discount: Number(updateDiscountDto.discount)},
    });
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    if (!id)
      throw new BadRequestException();
    
    return this.discountService.removeDiscount({ id: Number(id) })
  }
}
