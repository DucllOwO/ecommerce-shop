import { Module } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductItemController],
  providers: [ProductItemService, PrismaService],
  exports: [ProductItemService]
})
export class ProductItemModule {}
