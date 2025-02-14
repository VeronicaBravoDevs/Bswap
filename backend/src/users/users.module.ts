import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BooksModule } from 'src/books/books.module';
import { MockModule } from 'src/mock/mock.module';

@Module({
  imports: [
    PrismaModule,
    BooksModule,
    MockModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
