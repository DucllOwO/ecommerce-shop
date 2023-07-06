import { ProductService } from './../product/product.service';
import { Controller, Get, Param } from '@nestjs/common';
import { RecommenderService } from './recommender.service';

@Controller('recommender')
export class RecommenderController {
  constructor(
    private readonly recommenderService: RecommenderService,
    private productService: ProductService,
  ) {}

  @Get(':productID')
  getRecommendForProduct(@Param('productID') id: string) {
    const arrayID = this.recommenderService.recommendForProduct(id).slice(0, 5);

    return this.productService.products({
      where: {
        id: {
          in: arrayID.map((idTemp) => parseInt(idTemp.id)),
        },
      },
    });
  }
}
