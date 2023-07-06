import { RecommenderService } from './../recommender/recommender.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Logger,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import { nfd } from 'unorm';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private readonly productService: ProductService,
    private readonly recommenderService: RecommenderService,
  ) {}

  @Post()
  async create(@Body() createProductDto: Prisma.ProductCreateInput) {
    try {
      const respond = await this.productService.createProduct(createProductDto);

      const products = await this.productService.products({});

      this.recommenderService.trainingRecommender(products);
      console.log(
        "🚀 ~ file: product.controller.ts:35 ~ ProductController ~ create ~ this.recommenderService.recommendForProduct('1'):",
        this.recommenderService.recommendForProduct(respond.id.toString()),
      );

      return respond;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
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
