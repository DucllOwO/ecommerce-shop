import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OrderService } from './order.service';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: Prisma.OrderCreateInput) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get('/waiting')
  findAllWaiting() {
    return this.orderService.orders({
      where: {
        status: {
          equals: '0',
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  @Get('/delivery')
  findAllDelivery() {
    return this.orderService.orders({
      where: {
        status: {
          equals: '1',
        },
      },
    });
  }
  @Get('/completed')
  findAllCompleted() {
    return this.orderService.orders({
      where: {
        status: {
          equals: '2',
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  @Get('/canceled')
  findAllCanceled() {
    return this.orderService.orders({
      where: {
        status: {
          equals: '3',
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  @Get()
  findByUser(@Query('user') user: string) {
    return this.orderService.orders({
      where: {
        userID: {
          equals: Number(user),
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // throw new BadRequestException();
    return this.orderService.order({ id: Number(id) });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: Prisma.OrderCreateInput,
  ) {
    return this.orderService.updateOrder({
      where: { id: Number(id) },
      data: updateOrderDto,
    });
  }
}
