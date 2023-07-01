import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { VietQRStrategy } from './strategies/VietQR.strategy';

@Module({
  controllers: [PaymentController],
  providers: [VietQRStrategy],
})
export class PaymentModule {}
