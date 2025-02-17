import { PartialType } from '@nestjs/swagger';
import { CreateExchangeDto } from './createExchange.dto';

export class UpdateExchangeDto extends PartialType(CreateExchangeDto) {}