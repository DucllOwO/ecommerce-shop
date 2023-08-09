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
import { TagModule } from './tag/tag.module';
import { ProductItemModule } from './product-item/product-item.module';
import { CollectionModule } from './collection/collection.module';
import { AccountModule } from './account/account.module';
import { DiscountModule } from './discount/discount.module';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { ImageModule } from './image/image.module';
import * as cors from 'cors';
import { HelperModule } from './helper/helper.module';
import { RecommenderModule } from './recommender/recommender.module';
import { ImportModule } from './import/import.module';
import { PaymentModule } from './payment/payment.module';
import { MailModule } from './mailer/mailer.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HelperModule,
    AuthModule,
    UserModule,
    ProductModule,
    ReviewModule,
    ReceiptModule,
    FeedbackModule,
    VoucherModule,
    OrderModule,
    CartModule,
    ReportModule,
    TagModule,
    ProductItemModule,
    CollectionModule,
    AccountModule,
    DiscountModule,
    HelperModule,
    RecommenderModule,
    ImageModule,
    ImportModule,
    PaymentModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
