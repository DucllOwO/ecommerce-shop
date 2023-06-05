import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import * as ContentBasedRecommender from 'content-based-recommender-ts';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async findAll() {
    const res = await this.productService.products({});
    const rec = new ContentBasedRecommender();

    rec.train(
      res.map((ele) => ({
        id: ele.id.toString(),
        content: JSON.stringify(ele),
      })),
    );
    console.log(rec.getSimilarDocuments('3'));
    return res;
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
