import { Test, TestingModule } from '@nestjs/testing';
import { CollectionService } from './collection.service';

describe('CollectionService', () => {
  let service: CollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionService],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
  });

  it('collection service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all collection should have returned', () => {
    expect(service.collections).toHaveReturned();
  })

  it('get collection with id=1 should have returned with [object]', () => {
    expect(service.collection({
      id: 1
    })).toHaveReturnedWith({
      id: 1,
      name: 'Mùa xuân',
      discountID: 1
    })
  })

  it('post collection should have returned', ()=>{
    expect(service.createCollection({
      name: 'Mùa thu',
    })).toHaveReturned();
  })

});
