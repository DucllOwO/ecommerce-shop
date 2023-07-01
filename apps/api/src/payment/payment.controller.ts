import { CreateVietQRDto } from './dto/CreateVietQR.dto';
import { VietQRStrategy } from './strategies/VietQR.strategy';
import {
  Controller,
  Get,
  Logger,
  Query,
  BadRequestException,
} from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  constructor(private readonly vietQRStrategy: VietQRStrategy) {}

  @Get('/viet-qr')
  findAll(@Query() query: CreateVietQRDto) {
    this.logger.log(query);
    if (!(query.amount && query.message))
      throw new BadRequestException('Message and amount not found!!');

    return this.vietQRStrategy.createQR(query.message, query.amount);
  }
}
