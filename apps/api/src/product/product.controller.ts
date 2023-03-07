import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name)
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.products({});
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.product({id});
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: Prisma.ProductCreateInput) {
    return this.productService.updateProduct({
      where: {id: id},
      data: updateProductDto
    });
  }
}
