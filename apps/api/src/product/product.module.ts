import { RecommenderModule } from './../recommender/recommender.module';
import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  exports: [ProductService],
  imports: [forwardRef(() => RecommenderModule)],
})
export class ProductModule {}
