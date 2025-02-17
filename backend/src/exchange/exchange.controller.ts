import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateExchangeDto } from './dto/createExchange.dto';
import { UpdateExchangeDto } from './dto/updateExchange.dto';


@Controller('exchange')
@ApiTags('Exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) { }

  @Post()
  create(@Body() createUserDto: CreateExchangeDto) {
    return this.exchangeService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.exchangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExchangeDto: UpdateExchangeDto) {
    return this.exchangeService.update(id, updateExchangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeService.remove(id);
  }
}