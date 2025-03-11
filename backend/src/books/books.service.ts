import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as fs from 'fs';
import * as path from 'path';
import formidable from 'formidable';
import { IncomingMessage } from 'http';
import { connect } from 'http2';
import { Request } from 'express';


@Injectable()
export class BooksService {
  private uploadDir: string;

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {
    this.uploadDir = path.resolve(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async create(createBookDto: CreateBookDto, req: Request): Promise<any> {
    const user = req.user as { sub: string } | undefined;
    console.log(req.user);
    if (!user) {
      throw new BadRequestException('User not found in request');
    }
    const form = formidable({
      uploadDir: this.uploadDir,
      keepExtensions: true,
      multiples: true,
      allowEmptyFiles: true,
      minFileSize: 0,
    });

    try {
      const fileUrl = `${process.env.BACKEND_URL}/uploads/`;

      const parseForm = () =>
        new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
          (resolve, reject) => {
            form.parse(req, (err, fields, files) => {
              if (err) {
                reject(
                  new BadRequestException('Error parsing form data:' + err),
                );
              }
              resolve({ fields, files });
            });
          },
        );

      const { fields, files } = await parseForm();
 
      const book = await this.prismaService.book.create({
        data: {
          title: Array.isArray(fields.title)
            ? fields.title[0]
            : fields.title || '',
          author: Array.isArray(fields.author)
            ? fields.author[0]
            : fields.author || '',
          description: Array.isArray(fields.description)
            ? fields.description[0]
            : fields.description || '',
          genre: Array.isArray(fields.genre)
            ? fields.genre[0]
            : fields.genre || '',
          isbn: Array.isArray(fields.isbn) ? fields.isbn[0] : fields.isbn || '',
          publisher: Array.isArray(fields.publisher)
            ? fields.publisher[0]
            : fields.publisher || '',
          cover:
            files.images && files.images[0]
              ? fileUrl + files.images[0].newFilename
              : '',
          createdAt: new Date(),
          userId: user.sub,
        },
        include: {
          reviews: true,
          Images: true,
          categoryBooks: true,
        },
      });
      if (files.images) {
        const images = Array.isArray(files.images)
          ? files.images
          : [files.images];

        for (const image of images) {
          await this.prismaService.images.create({
            data: {
              file: fileUrl + image.newFilename,
              bookId: book.id,
            },
          });
        }
      }
      return { message: 'New book created', data: book };

    } catch (error) {
      console.error('Error creating book:', error);
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
        categoryBooks: true,
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
          categoryBooks: true,
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
