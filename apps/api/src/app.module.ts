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

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), UserModule, ProductModule, ReviewModule, ReceiptModule, FeedbackModule, VoucherModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
