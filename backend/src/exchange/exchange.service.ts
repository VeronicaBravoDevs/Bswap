import { Injectable, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExchangeDto } from './dto/createExchange.dto';
import { UpdateExchangeDto } from './dto/updateExchange.dto';
import { ExchangeStatus } from 'prisma/generated/client';

@Injectable()
export class ExchangeService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async create(createExchangeDto: CreateExchangeDto) {
        try {
            const { bookId, requesterId, status, ...rest } = createExchangeDto;

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
