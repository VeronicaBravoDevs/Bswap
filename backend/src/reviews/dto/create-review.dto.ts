import { ApiProperty, OmitType } from '@nestjs/swagger';


import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsOptional,
    MaxLength,
    MinLength,
    ValidateNested,
    IsArray,
    IsEnum,
    IsDate,
    IsNumber,
} from 'class-validator';


export class CreateReviewDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bookId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    rating: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsDate()
    publication_date: Date


    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    contents: string;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    reactions: string;

}