import { AccountService } from './../account/account.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly salt = 12;
  constructor(private accountService: AccountService, private userService: UserService, private jwtService: JwtService) { }


  async validateUser(loginUserDto: LoginUserDto) {

    const account = await this.accountService.findOne({ email: loginUserDto.email })

    if (!account) {
      throw new NotFoundException();
    }

    // hash login userdto password
    const isMatch = await bcrypt.compare(loginUserDto.password, account.password)

    // if true return access_token, false return UnauthorizedException
    if (!isMatch)
      throw new UnauthorizedException();

    //get user information to create payload
    const { password: removedPassword, ...userData } = account;

    return {
      access_token: this.jwtService.sign(userData),
    };

  }
}
