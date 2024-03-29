import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ReceiptService } from './receipt.service';


@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  create(@Body() createReceiptDto: Prisma.ReceiptCreateInput) {
    return this.receiptService.createReceipt(createReceiptDto);
  }

  @Get('/unpaid')
  findUnpaid() {
    return this.receiptService.receipts({
      where: {
        status: {
          equals: "0"
        }
      }
    });
  }
  @Get('/paid')
  findPaid() {
    return this.receiptService.receipts({
      where: {
        status: {
          equals: "1"
        }
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptService.receipt({id: Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiptDto: Prisma.ReceiptCreateInput) {
    return this.receiptService.updateReceipt({
      where: {id: Number(id)},
      data: updateReceiptDto
    });
  }
}
