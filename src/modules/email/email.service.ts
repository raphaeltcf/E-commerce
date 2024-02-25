import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(data: CreateEmailDto) {
    await this.mailerService.sendMail({
      to: data.email,
      from: process.env.FROM_EMAIL,
      subject: data.title,
      html: data.body,
    });
  }
}
