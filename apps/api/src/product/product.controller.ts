import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
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
  findAll(@Query() query : any) {
    return this.productService.products({
      orderBy:{
        id: 'asc'
      },
      where: query
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("first")
    return this.productService.product({id : Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: Prisma.ProductUpdateInput) {
    console.log("called")
    return this.productService.updateProduct({
      where: {id: Number(id)},
      data: updateProductDto
    });
  }
}
