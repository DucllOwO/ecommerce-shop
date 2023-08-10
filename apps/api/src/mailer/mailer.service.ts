import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPasswordEmail(email: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Quên mật khẩu',
      template: './forgot-password.pug',
      context: { token },
    });
  }
}
