import { Controller } from '@nestjs/common';
import { RecommenderService } from './recommender.service';

@Controller('recommender')
export class RecommenderController {
  constructor(private readonly recommenderService: RecommenderService) {}
}
