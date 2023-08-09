import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}
  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDiscountDto: Prisma.DiscountUpdateInput) {
    if (isNaN(id))
      throw new BadRequestException();
    
    return this.discountService.updateDiscount({
      where: {id: Number(id)},
      data: {...updateDiscountDto, discount: Number(updateDiscountDto.discount)},
    });
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number) {
    if (!id)
      throw new BadRequestException();
    
    return this.discountService.removeDiscount({ id: Number(id) })
  }
}
