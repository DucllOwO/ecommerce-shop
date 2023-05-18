import { HelperService } from './../helper/helper.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { VoucherService } from './voucher.service';
import dayjs from 'dayjs';

@Controller('voucher')
export class VoucherController {
  constructor(
    private readonly voucherService: VoucherService,
    private readonly helper: HelperService,
  ) {}

  @Post()
  create(@Body() createVoucherDto: Prisma.VoucherCreateInput) {
    return this.voucherService.createVoucher(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.vouchers({});
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.voucherService.voucher({ code });
  }

  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body() updateVoucherDto: Prisma.VoucherCreateInput,
  ) {
    if (this.helper.isNullorUndefined(code)) throw new BadRequestException();

    return this.voucherService.updateVoucher({
      where: { code },
      data: { ...updateVoucherDto, due: new Date(updateVoucherDto.due) },
    });
  }
}
