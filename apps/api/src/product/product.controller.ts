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
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private readonly productService: ProductService,
    private readonly recommenderService: RecommenderService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createProductDto: Prisma.ProductCreateInput) {
    try {
      const respond = await this.productService.createProduct(createProductDto);

      const products = await this.productService.products({});

      this.recommenderService.trainingRecommender(products);

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
  @Get('/active')
  findAllActive() {
    return this.productService.products({
      where: {
        isActive: {
          equals: true,
        },
      },
    });
  }

  @Roles(Role.Admin)
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

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    this.logger.log('product update body', updateProductDto);
    return this.productService.updateProduct({
      where: { id: Number(id) },
      data: updateProductDto,
    });
  }
}
