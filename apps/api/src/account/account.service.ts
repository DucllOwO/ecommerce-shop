import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);
  private readonly salt = 12;
  constructor(private prisma: PrismaService) {

  }
  async create(createAccountDto: Prisma.AccountCreateInput) {
    console.log(createAccountDto.password)
    const hashPassword = await bcrypt.hash(createAccountDto.password, this.salt)
    return this.prisma.account.create({ data: { ...createAccountDto, password: hashPassword } });
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(accountWhereInput: Prisma.AccountWhereUniqueInput) {
    return this.prisma.account.findUnique({
      where: accountWhereInput,
      include: { User: true }
    });
  }

  update(id: number, updateAccountDto: Prisma.AccountUpdateInput) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
