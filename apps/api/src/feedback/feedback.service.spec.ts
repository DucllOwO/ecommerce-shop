import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import exp from 'constants';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackService],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get feedback should have returned', () => {
    expect(service.feedback({id: 1})).toHaveReturned();
  })

  it('get all feedback should have returned', () => {
    expect(service.feedbacks({})).toHaveReturned();
  })

  it('create feedback should have returned', () => {
    expect(service.createFeedback({
      content: "test",
      rate: 5,
      author: {
        connect: {
          id: '079202011909'
        }
      }
    })).toHaveReturned();

    it('update feedback should have returned', () => {
      expect(service.updateFeedback({
        where: {
          id: 1
        },
        data: {
          rate: 4
        },
      })).toHaveReturned();
    })
  })
});
