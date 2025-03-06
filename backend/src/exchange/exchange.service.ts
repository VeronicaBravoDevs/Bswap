import { Injectable, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExchangeDto } from './dto/createExchange.dto';
import { UpdateExchangeDto } from './dto/updateExchange.dto';
import { ExchangeStatus } from 'prisma/generated/client';
import { error } from 'console';

@Injectable()
export class ExchangeService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async create(createExchangeDto: CreateExchangeDto) {
        try {
            const { bookId, requesterId, status, ...rest } = createExchangeDto;

            const bookExist = await this.prismaService.book.findUnique({
                where: { id: bookId }
            });

            if (!bookExist) {
                throw new HttpException('Invalid book ID', HttpStatus.BAD_REQUEST);
            }

            const requesterIdExist = await this.prismaService.user.findUnique({
                where: { id: requesterId }
            });

            if (!requesterIdExist) {
                throw new HttpException('Invalid requester Id', HttpStatus.BAD_REQUEST);
            }

            const newExchange = await this.prismaService.exchange.create({
                data: {
                    requester_id: requesterId,
                    book_id: bookId,
                    ...rest
                },
            });

            return { message: "new exchange create", data: newExchange };
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findAll() {
        try {
            const allExchanges = await this.prismaService.exchange.findMany();

            return { message: "Returned all exchanges", data: allExchanges }
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findOne(id: string) {
        try {
            const findOneExchange = await this.prismaService.exchange.findUnique({
                where: { id }
            })

            if (!findOneExchange) {
                throw new HttpException('User not found by Id', HttpStatus.BAD_REQUEST)
            }

            return { message: "Returned exchange", data: findOneExchange }
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    async update(id: string, updateExchangeDto: UpdateExchangeDto) {
        try {
            const { requesterId, bookId, request_date, status } = updateExchangeDto as { requesterId: string, bookId: string, request_date: Date, status: ExchangeStatus };

            const requesterIdExist = await this.prismaService.user.findUnique({
                where: { id: requesterId }
            });
            if (!requesterIdExist) {
                throw new HttpException('Invalid requester Id', HttpStatus.BAD_REQUEST);
            }

            const bookExist = await this.prismaService.book.findUnique({
                where: { id: bookId }
            });

            if (!bookExist) {
                throw new HttpException('Invalid book ID', HttpStatus.BAD_REQUEST);
            }
            const updateExchange = await this.prismaService.exchange.update({
                where: { id },
                data: {
                    requester_id: requesterId,
                    book_id: bookId,
                    request_date: request_date,
                    status: status,
                }
            })

            return { messasge: "update successful", data: updateExchange }
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

            const exchangeExist = await this.prismaService.exchange.findUnique({
                where: { id: id }
            })

            if (!exchangeExist) {
                throw new HttpException('exange not found by Id', HttpStatus.BAD_REQUEST)
            }

            const removeExchange = await this.prismaService.exchange.delete({
                where: { id }
            });



            return { message: "Delete sucessful", data: removeExchange }
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }
}
