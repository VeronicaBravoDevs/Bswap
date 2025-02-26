import { Module } from '@nestjs/common';
import { CategoryBooksService } from './category-books.service';
import { CategoryBooksController } from './category-books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [CategoryBooksController],
  providers: [CategoryBooksService],
})
export class CategoryBooksModule {}
