import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { Prisma } from '@prisma/client';

@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @Post()
  create(@Body() createProductItemDto: Prisma.Product_itemCreateInput) {
    return this.productItemService.createProductItem(createProductItemDto);
  }

  @Get()
  findAll() {
    return this.productItemService.productItems({});
  }

  @Get('/all-colors')
  getAllColors() {
    return this.productItemService.getColorVariants();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productItemService.productItem({ id: Number(id) });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductItemDto: Prisma.Product_itemCreateInput,
  ) {
    return this.productItemService.updateProductItem({
      where: { id: Number(id) },
      data: updateProductItemDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productItemService.removeProductItem({ id: Number(id) });
  }
}
