import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModuleEmail } from 'src/nodemailer/nodemailer.module';

@Module({
  imports: [PrismaModule, MailerModuleEmail],
  providers: [ExchangeService],
  controllers: [ExchangeController]
})
export class ExchangeModule {}
