import { Injectable, BadRequestException, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(createBookDto: CreateBookDto) {
    try {
      const { title, author, description, genre, image, isbn, publisher } = createBookDto;

      const book = await this.prismaService.book.create({
        data: {
          title,
          author,
          description,
          genre,
          image,
          isbn,
          publisher,
        },
      });

      return book;
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const books = await this.prismaService.book.findMany();

      return books
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const bookById = await this.prismaService.book.findUnique({
        where: { id }
      });
      if (!bookById) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return bookById
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const { ...rest } = updateBookDto;

      const updateDataBook: any = { ...rest }

      const bookById = await this.prismaService.book.update({
        where: { id },
        data: updateDataBook
      });
      return { message: "Update successfull", data: bookById };

    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {

    try {
      const bookToDelete = await this.prismaService.book.delete({
        where: { id }
      })
      return { message: "Book delete successfull", data: bookToDelete }

    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }


  }
}
