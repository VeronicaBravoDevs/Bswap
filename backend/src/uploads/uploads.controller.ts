import { Controller, Post, Req, Res, UseInterceptors,  UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FileUploadDto } from './dto/upload.dto';


@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir un archivo' })
  @ApiBody({
    description: 'Sube un archivo',
    type: FileUploadDto,  
  })
  @ApiResponse({ status: 200, description: 'Archivo subido con éxito.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = this.uploadsService.uploadFile(file);
    return { fileUrl };
  }
}
