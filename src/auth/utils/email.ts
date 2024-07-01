import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Mail {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, verificationCode: string) {
    const message = `Your verification code is ${verificationCode}. If you didn't request this code, please ignore this email!`;

    await this.mailerService.sendMail({
      from: 'Your Name <your-email@example.com>',
      to: email,
      subject: 'Verification Code',
      text: message,
    });
  }
}
