import { Injectable, BadRequestException, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BooksService } from 'src/books/books.service';
import { MockService } from 'src/mock/mock.service';



export const roundOfHashing = 10;

@Injectable()
export class UsersService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookService: BooksService,
    private readonly mockService: MockService,
  ) { }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.email.toLocaleLowerCase();
  
    const user = await this.findByEmail(createUserDto.email);
  
    if (user) {
      throw new HttpException('User Already Exist', HttpStatus.CONFLICT);
    }
  
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, roundOfHashing);
      const { email, password, library, ...rest } = createUserDto;
  
      const newUser = await this.prismaService.user.create({
        data: {
          ...rest,
          email,
          password_hash: hashedPassword,
        },
      });
  
      const mockBooks = await this.mockService.getMockData();
      console.log(mockBooks)
      const userBooks = mockBooks.data.slice(0, 3);
      await Promise.all(
        userBooks.map(async (book) => {
          await this.prismaService.book.create({
            data: {
              title: book.title,
              author: book.author,
              userId: newUser.id,  // Asocia los libros al usuario recién creado
            },
          });
        })
      );
  
      const userWithBooks = await this.prismaService.user.findUnique({
        where: { id: newUser.id },
        include: {
          library: true,  // Incluye los libros en la respuesta
        },
      });
  
      return userWithBooks;
    } catch (error) {
      console.error(error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async findAll() {

    try{
      const users = await this.prismaService.user.findMany()
      return users;
    }catch(error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      })

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.findOne(id);
    try {
      if(updateUserDto.password){
        updateUserDto.password = await bcrypt.hash(
          updateUserDto.password,
          roundOfHashing,
        );
      }

      const {password, ...rest} = updateUserDto;
      const updateData: any = {
        ...rest,
        password_hash: password,
      };


      const update = await this.prismaService.user.update({
        where: { id },
        data: updateData,
      })
      return {
        message: 'User updated successfully',
        data: update,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      const remove = await this.prismaService.user.delete({
        where: { id },
      });
      return {
        message: 'User deleted successfully',
        data: remove,
      };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
