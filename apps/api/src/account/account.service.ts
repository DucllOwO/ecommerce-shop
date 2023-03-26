import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {

  }
  create(createAccountDto: Prisma.AccountCreateInput) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(accountWhereInput: Prisma.AccountWhereUniqueInput) {
    return this.prisma.account.findUnique({
      where: accountWhereInput
    });
  }

  update(id: number, updateAccountDto: Prisma.AccountUpdateInput) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
