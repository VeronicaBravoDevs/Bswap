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
import { ExchangeModule } from './exchange/exchange.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UploadsModule } from './uploads/uploads.module';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryBooksModule } from './category-books/category-books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    BooksModule,
    MockModule,
    SeedModule,
    ExchangeModule,
    ReviewsModule,
    UploadsModule,
    AuthModule,
    MulterModule.register({
      dest: '../uploads',
    }),
    CategoryBooksModule,
  ],
  controllers: [AppController, MockController],
  providers: [AppService, MockService],
})
export class AppModule {}
