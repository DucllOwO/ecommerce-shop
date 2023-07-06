import {
  NotFoundException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { UserService } from './../user/user.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createAccountDto: Prisma.AccountCreateInput) {
    console.log(createAccountDto);
    return this.accountService.create(createAccountDto);
  }

  @Patch('password-reset/:email')
  async resetPassword(@Param('email') email: string) {
    if (!email)
      throw new BadRequestException('Đã có lỗi xảy ra bên dưới hệ thống.');

    const user = await this.userService.users({
      where: { email: { equals: email } },
    });

    if (!user[0]) throw new NotFoundException('Cập nhật mật khẩu thất bại.');

    return this.accountService.update(email, {
      password: await this.accountService.hashPassword(user[0].phone_number),
    });
  }

  @Patch(':email')
  async updatePassword(
    @Param('email') email: string,
    @Body() body: { password: string },
  ) {
    if (!email) throw new BadRequestException();

    return this.accountService.update(email, {
      password: await this.accountService.hashPassword(body.password),
    });
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.accountService.findOne({ email });
  }
}
