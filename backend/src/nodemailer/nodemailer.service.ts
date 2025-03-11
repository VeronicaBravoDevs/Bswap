import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { link } from 'fs';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, template: string, context: any) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context: {
        bookTitle: context.bookTitle,
        email: to,
        name: context.name,
        owneremail: context.owneremail,
        requesterName: context.requesterName,
        link: context.link,
      }
    });
  }
}