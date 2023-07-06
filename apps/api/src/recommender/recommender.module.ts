import { ProductService } from './../product/product.service';
import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { RecommenderService } from './recommender.service';
import { RecommenderController } from './recommender.controller';
import { ProductModule } from 'src/product/product.module';
import * as ContentBasedRecommender from 'content-based-recommender-ts';

@Module({
  imports: [forwardRef(() => ProductModule)],
  controllers: [RecommenderController],
  providers: [RecommenderService, ProductService],
  exports: [RecommenderService],
})
export class RecommenderModule implements OnModuleInit {
  constructor(
    private productService: ProductService,
    private recommenderService: RecommenderService,
  ) {}

  async onModuleInit() {
    const recommender = new ContentBasedRecommender({
      minScore: 0,
      maxSimilarDocs: 100,
      maxVectorSize: 50,
      debug: false,
    });

    this.recommenderService.setRecommender(recommender);
    const products = await this.productService.products({});
    this.recommenderService.train(products);
  }
}
