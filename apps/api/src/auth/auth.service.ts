import { AccountService } from './../account/account.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {}
