import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all tag should have returned', () => {
    expect(service.tags({})).toHaveReturned();
  });

  it('get tag should have returned', () => {
    expect(service.tag({id: 1})).toMatchObject({id: 1});
  });
});
