import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsOptional,
} from 'class-validator';



export class CreateBookDto {


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cover: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    genre: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    image: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    isbn: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    publisher?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    published: string
}
