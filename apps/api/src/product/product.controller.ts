import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Logger,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import { nfd } from 'unorm';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productService.createProduct(createProductDto);
  }

  @Post('/viewed/:id')
  increaseView(@Param('id') id: number) {
    return this.productService.increaseProductView(Number(id));
  }

  @Get('search')
  async searchProductByName(@Query('name') name: string) {
    if (!name) return [];

    const searchTokens = name
      .split(' ')
      .map((token) => nfd(token.normalize('NFD')).toLowerCase());

    const filters = searchTokens.map((token) => ({
      name: {
        contains: token,
        mode: Prisma.QueryMode.insensitive,
      },
    }));
    const products = await this.productService.productsNotIncludeAnyRelation({
      where: {
        OR: filters,
      },
    });

    return products;
  }

  @Get()
  findAll(@Query() query: Prisma.ProductWhereInput) {
    return this.productService.products({
      orderBy: {
        id: 'asc',
      },
      where: query,
    });
  }

  @Get('/best-sellers')
  findTopTenBestSellers() {
    return this.productService.products({
      orderBy: {
        sold: 'desc',
      },
      take: 10,
    });
  }

  @Get('/most-viewed')
  findBestSellers() {
    return this.productService.products({
      orderBy: {
        view: 'desc',
      },
      take: 10,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.product({ id: Number(id) });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductDto: Prisma.ProductCreateInput,
  ) {
    return this.productService.updateProduct({
      where: { id: Number(id) },
      data: updateProductDto,
    });
  }
}
