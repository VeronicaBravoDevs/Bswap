import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { Express } from 'express';
import { Multer } from 'multer';

@Injectable()
export class UploadsService {
  private uploadDir: string;

  constructor(private readonly prismaService: PrismaService) {
    this.uploadDir = path.resolve(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async create(bookId: string, file: Express.Multer.File) {
    const filePath = path.join(this.uploadDir, file.originalname);

    fs.writeFileSync(filePath, file.buffer);

    const fileUrl = `${process.env.BACKEND_URL}/uploads/${file.originalname}`;

    const createdFile = await this.prismaService.images.create({
      data: {
        file: fileUrl,
        book: {
          connect: { id: bookId },
        },
      },
    });
    return createdFile;
  }
}
