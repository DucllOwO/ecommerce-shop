import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { VoucherService } from './voucher.service';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: Prisma.VoucherCreateInput) {
    return this.voucherService.createVoucher(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.vouchers({});
  }

  @Get(':id')
  findOne(@Param('code') code: string) {
    return this.voucherService.voucher({code});
  }

  @Patch(':id')
  update(@Param('code') code: string, @Body() updateVoucherDto: Prisma.VoucherCreateInput) {
    return this.voucherService.updateVoucher({
      where: {code},
      data: updateVoucherDto,
    });
  }
}
