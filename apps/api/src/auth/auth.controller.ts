import { LoginUserDto } from './dto/loginUser.dto';
import { Controller, Body, BadRequestException } from '@nestjs/common';
import { Post, Request, UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() loginUser: LoginUserDto) {
    if (!loginUser.email || !loginUser.password)
      throw new BadRequestException();

    return this.authService.validateUser(loginUser);
  }
}

