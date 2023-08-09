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
  Query,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { VoucherService } from './voucher.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('voucher')
export class VoucherController {
  constructor(
    private readonly voucherService: VoucherService,
    private readonly helper: HelperService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createVoucherDto: Prisma.VoucherCreateInput) {
    console.log(createVoucherDto);
    return this.voucherService.createVoucher(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.vouchers({});
  }

  
  @Get(':code')
  findOne(@Param('code') code: string, @Query('isActive') isActive: string) {
    if(isActive)
      return this.voucherService.vouchers({where: {
        AND:{
          code: code,
          isActive: Boolean(isActive) 
        }
      }});
    else
      return this.voucherService.voucher({code});
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body() updateVoucherDto: Prisma.VoucherUpdateInput,
  ) {
    if (this.helper.isNullorUndefined(code)) throw new BadRequestException();

    return this.voucherService.updateVoucher({
      where: { code },
      data: {
        ...updateVoucherDto,
        due: new Date(updateVoucherDto.due as string),
        isActive: true,
      },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('shutdown/:code')
  shutdownVoucher(@Param('code') code: string) {
    if (this.helper.isNullorUndefined(code)) throw new BadRequestException();

    return this.voucherService.updateVoucher({
      where: { code },
      data: { isActive: false },
    });
  }
}
