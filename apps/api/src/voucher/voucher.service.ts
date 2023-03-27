import { Injectable } from '@nestjs/common';
import { Prisma, Voucher } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) { }

  async voucher(
    voucherWhereUniqueInput: Prisma.VoucherWhereUniqueInput,
  ): Promise<Voucher | null> {
    return this.prisma.voucher.findUnique({
      where: voucherWhereUniqueInput,
    });
  }

  async vouchers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VoucherWhereUniqueInput;
    where?: Prisma.VoucherWhereInput;
    orderBy?: Prisma.VoucherOrderByWithRelationInput;
  }): Promise<Voucher[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.voucher.findMany({
      skip,
      take,
      orderBy,
    });
  }
  createVoucher(data: Prisma.VoucherCreateInput): Promise<Voucher> {
    return this.prisma.voucher.create({
      data
    });
  }

  updateVoucher(params: {
    where: Prisma.VoucherWhereUniqueInput,
    data: Prisma.VoucherCreateInput
  }): Promise<Voucher> {
    const { where, data } = params
    return this.prisma.voucher.update({
      where,
      data,
    });
  }
}
