import { MailService } from '../mailer/mailer.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/loginUser.dto';
import { Controller, Body, BadRequestException } from '@nestjs/common';
import { Post, Request, UseGuards } from '@nestjs/common/decorators';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailer: MailService,
  ) {}

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string): Promise<string> {
    const token = Math.floor(1000 + Math.random() * 9000).toString();

    // Send the forgot password email
    await this.mailer.sendForgotPasswordEmail(email, token);
    return token;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() loginUser: LoginUserDto, @Request() req) {
    if (!loginUser.email || !loginUser.password)
      throw new BadRequestException();

    return req.user;
  }
}
