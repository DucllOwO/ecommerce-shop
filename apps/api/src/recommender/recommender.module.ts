import { Product } from '@prisma/client';
import { ProductService } from './../product/product.service';
import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { RecommenderService } from './recommender.service';
import { RecommenderController } from './recommender.controller';
import { ProductModule } from 'src/product/product.module';
import * as ContentBasedRecommender from 'content-based-recommender-ts';
import { Inject } from '@nestjs/common/decorators';

@Module({
  imports: [ProductModule],
  controllers: [RecommenderController],
  providers: [RecommenderService, ProductService],
})
export class RecommenderModule implements OnModuleInit {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
    @Inject(forwardRef(() => RecommenderService))
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

  traningRecommender(products: Product[]) {
    const recommender = new ContentBasedRecommender({
      minScore: 0,
      maxSimilarDocs: 100,
      maxVectorSize: 50,
      debug: false,
    });

    this.recommenderService.setRecommender(recommender);
    this.recommenderService.train(products);
  }
}
