import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    try {
      const { bookId, userId, comments, reactions, ...rest } = createReviewDto;

      const findBook = await this.prismaService.book.findUnique({
        where: { id: bookId },
      });

      if (!findBook || typeof bookId !== 'string') {
        throw new HttpException('Invalid book ID', HttpStatus.BAD_REQUEST);
      }

      const findUser = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!findUser || typeof userId !== 'string') {
        throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
      }

      const newReview = await this.prismaService.review.create({
        data: {
          ...rest,
          book_id: bookId,
          user_id: userId,
        },
      });

      return { message: 'review created', data: newReview };
    } catch (error) {
      console.error('Error creating review:', error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const allReviews = await this.prismaService.review.findMany();
      return { message: 'All reviews returned', data: allReviews };
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
      throw new HttpException(
        'Error retrieving reviews',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const findReviewById = await this.prismaService.review.findUnique({
        where: { id: id },
        include: {
          book: true,
          user: true,
          reactions: true,
          comments: true,
        },
      });

      if (!findReviewById || typeof findReviewById !== 'object') {
        throw new HttpException('Review not exist', HttpStatus.BAD_REQUEST);
      }

      return { message: 'review found', data: findReviewById };
    } catch (error) {
      console.error('Error creating review:', error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const { ...rest }: any = updateReviewDto;
    try {

      const findReviewById = await this.prismaService.review.findUnique({
        where: { id },
      });
      
      if (!findReviewById || typeof findReviewById !== 'object') {
        throw new HttpException('Review not exist', HttpStatus.BAD_REQUEST);
      };

      const updateRview = await this.prismaService.review.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      return { message: 'review update', data: updateRview };
    } catch (error) {
      console.error('Error creating review:', error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {

      const findReviewById = await this.prismaService.review.findUnique({
        where: { id },
      });
      
      if (!findReviewById || typeof findReviewById !== 'object') {
        throw new HttpException('Review not exist', HttpStatus.BAD_REQUEST);
      }
      const removeReview = this.prismaService.review.delete({
        where: { id },
      });


      return { message: 'Review delete', data: removeReview };
    } catch (error) {
      console.error('Error creating review:', error.message);
  
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
