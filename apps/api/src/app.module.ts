import { configuration } from './../config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ReceiptModule } from './receipt/receipt.module';
import { FeedbackModule } from './feedback/feedback.module';
import { VoucherModule } from './voucher/voucher.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { ReportModule } from './report/report.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true,

  }), UserModule, ProductModule, ReviewModule, ReceiptModule, FeedbackModule, VoucherModule, OrderModule, CartModule, ReportModule, AccountModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
