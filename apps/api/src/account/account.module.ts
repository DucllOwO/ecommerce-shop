import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService, PrismaService],
  exports: [AccountService],
  imports: [UserModule],
})
export class AccountModule {}
