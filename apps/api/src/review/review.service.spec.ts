import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all review should have returned', () => {
    expect(service.reviews({})).toHaveReturned();
  });

  it('get review should have returned', () => {
    expect(service.review({id: 1})).toMatchObject({id: 1});
  });
});
