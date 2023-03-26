import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  controllers: [AccountController],
  providers: [AccountService, PrismaService]
})
export class AccountModule { }
