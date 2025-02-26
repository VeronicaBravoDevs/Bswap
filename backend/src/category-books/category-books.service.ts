import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryBookDto } from './dto/create-category-book.dto';
import { UpdateCategoryBookDto } from './dto/update-category-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryBooksService {

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(createCategoryBookDto: CreateCategoryBookDto) {
    try {
      const { category, bookId } = createCategoryBookDto;

      const bookExists = await this.prismaService.book.findUnique({
        where: { id: bookId },
      });

      if (!bookExists) {
        throw new HttpException(
          'El libro con el ID proporcionado no existe.',
          HttpStatus.NOT_FOUND
        );
      }
      const existingCategory = await this.prismaService.categoryBooks.findFirst({
        where: { bookId, category },
      });

      if (existingCategory) {
        throw new HttpException(
          'El libro ya tiene esta categoría asignada.',
          HttpStatus.BAD_REQUEST
        );
      }
      const bookWithCategory = await this.prismaService.categoryBooks.create({
        data: {
          category,
          book: {
            connect: { id: bookId },
          },
        },
      });

      return { message: 'Categoría asignada', data: bookWithCategory };
    } catch (error) {
      console.error('Error asignando categoría:', error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error al asignar la categoría',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll() {
    try {
      const allCategories = await this.prismaService.categoryBooks.findMany();

      return ({ message: "returned all categories", data: allCategories })
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      throw new HttpException(
        'Error retrieving categories',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: string) {
    try {
      const categoryById = await this.prismaService.categoryBooks.findUnique({
        where: { id },
      });

      if (!categoryById) {
        throw new HttpException(
          'La categoría con el ID proporcionado no existe.',
          HttpStatus.NOT_FOUND
        );
      }

      return { message: 'Categoría encontrada', data: categoryById };
    } catch (error) {
      console.error('Error fetching categories:', error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error al obtener la categoría',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, updateCategoryBookDto: UpdateCategoryBookDto) {
    try {
      const categoryById = await this.prismaService.categoryBooks.findUnique({
        where: { id }
      });
      if (!categoryById) {
        throw new HttpException(
          'La categoría con el ID proporcionado no existe.',
          HttpStatus.NOT_FOUND
        );
      };
      const { category }: any = updateCategoryBookDto;

      const updateCategory = await this.prismaService.categoryBooks.update({
        where: { id },
        data: { category },
      })

      return ({ message: "data update", data: updateCategory })
    } catch (error) {
      console.error('Error fetching categories:', error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error al obtener la categoría',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: string) {
    try {
      const categoryById = await this.prismaService.categoryBooks.findUnique({
        where: { id }
      });

      if (!categoryById) {
        throw new HttpException(
          'La categoría con el ID proporcionado no existe.',
          HttpStatus.NOT_FOUND
        );
      };

      await this.prismaService.categoryBooks.delete({
        where: { id }
      })

      return ({ message: "category remove" })
    } catch (error) {
      console.error('Error fetching categories:', error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error al obtener la categoría',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
