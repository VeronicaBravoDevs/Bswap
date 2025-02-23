import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpServer,
  HttpStatus,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const { title, author, description, genre, isbn, publisher, cover } =
        createBookDto;

      const book = await this.prismaService.book.create({
        data: {
          title,
          author,
          description,
          genre,
          isbn,
          publisher,
          cover,
          createdAt: new Date(),
        },
        include: {
          reviews: true,
          Images: true,
        },
      });

      return { message: 'new book created', data: book };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(quantity?: number) {
    const cacheKey = 'all_books';
    const cacheQuantity = 'quantityCache';

    const cachedQuantity = await this.cacheManager.get(cacheQuantity);
    const cachedBooks = await this.cacheManager.get(cacheKey);

    if (cachedBooks && cachedQuantity) {
      return cachedBooks;
    }

    const parsedQuantity = quantity
      ? Math.max(parseInt(quantity.toString(), 10), 1)
      : undefined;
    const books = await this.prismaService.book.findMany({
      orderBy: { createdAt: 'desc' },
      take: parsedQuantity,
      include: {
        reviews: true,
        Images: true,
      },
    });

    await this.cacheManager.set(cacheKey, books, 36000);

    return { data: books };
  }

  async findOne(id: string) {
    try {
      const bookById = await this.prismaService.book.findUnique({
        where: { id },
        include: {
          reviews: true,
          Images: {
            select: {
              id: true,
              file: true,
              bookId: true,
            },
          },
        },
      });
      if (!bookById) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return { message: 'Book found', data: bookById };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const { ...rest } = updateBookDto;

      const updateDataBook: any = { ...rest };

      const bookById = await this.prismaService.book.update({
        where: { id },
        data: updateDataBook,
      });
      return { message: 'Update successfull', data: bookById };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const bookToDelete = await this.prismaService.book.delete({
        where: { id },
      });
      return { message: 'Book delete successfull', data: bookToDelete };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
