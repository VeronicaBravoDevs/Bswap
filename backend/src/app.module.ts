import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MockService } from './mock/mock.service';
import { MockController } from './mock/mock.controller';
import { BooksModule } from './books/books.module';
import { MockModule } from './mock/mock.module';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [PrismaModule, UsersModule, BooksModule, MockModule, SeedModule],
  controllers: [AppController, MockController],
  providers: [AppService, MockService],
})
export class AppModule {}
