import { PrismaModule } from './../prisma/prisma.module';
import { AccountModule } from './../account/account.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.stategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './strategies/jwt.stategy';
import { UserService } from '../user/user.service';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  imports: [AccountModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: "7d" },
  }), PrismaModule],
  controllers: [AuthController]
})
export class AuthModule { }
