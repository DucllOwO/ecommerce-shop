import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import exp from 'constants';
import dayjs from 'dayjs';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get order with {id: 1} should have returned with', () => {
    expect(service.order({id: 1})).toHaveReturned();
  })

  it('get all order should have returned', () => {
    expect(service.orders({})).toHaveReturned();
  })

  it('create order should have returned with', () => {
    expect(service.createOrder({
      date: new Date(Date.now()),
      buyer: {
        connect: {
          id: '079202011909'
        }
      },
      total_cost: 1200000,
      status: '0',
      Order_detail: {
        create: {
          product_item: {
            connect: {
              id: 1
            }
          }
        }
      }

    }))
  })
});
