import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './nodemailer.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(@Body('email') email: string) {
    await this.mailService.sendMail(
      email,
      'Bienvenido',
      'welcome',
      { name: 'Usuario' },
    );
    return 'Correo enviado';
  }
}