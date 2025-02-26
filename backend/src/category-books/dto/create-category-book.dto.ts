import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateCategoryBookDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bookId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string
}
