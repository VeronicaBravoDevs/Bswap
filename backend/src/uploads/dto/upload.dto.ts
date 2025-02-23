import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Archivo a cargar',
  })
  @IsNotEmpty()
  file: any;

  @ApiProperty()
  @IsNotEmpty()
  bookId: string;
}
