import { Module } from '@nestjs/common';
import { RecommenderService } from './recommender.service';
import { RecommenderController } from './recommender.controller';

@Module({
  controllers: [RecommenderController],
  providers: [RecommenderService]
})
export class RecommenderModule {}
