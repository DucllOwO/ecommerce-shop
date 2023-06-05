import { Test, TestingModule } from '@nestjs/testing';
import { RecommenderController } from './recommender.controller';
import { RecommenderService } from './recommender.service';

describe('RecommenderController', () => {
  let controller: RecommenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommenderController],
      providers: [RecommenderService],
    }).compile();

    controller = module.get<RecommenderController>(RecommenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
