import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.stategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.stategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [UserModule, PassportModule, ConfigModule.forRoot(), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: "7d" },
  })],
  controllers: [AuthController]
})
export class AuthModule { }
