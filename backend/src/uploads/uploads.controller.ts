import {
  Controller,
  Post,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileUploadDto } from './dto/upload.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir un archivo' })
  @ApiBody({
    description: 'Sube un archivo y asócialo a un libro',
    type: CreateFileUploadDto,
  })
  @ApiResponse({ status: 200, description: 'Archivo subido con éxito.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('bookId') bookId: string,
  ) {
    if (!bookId) {
      return { message: 'bookId es obligatorio' };
    }

    const createdFile = await this.uploadsService.create(bookId, file);
    return { message: 'Archivo subido con éxito', data: createdFile };
  }
}
