import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadsService {
  private uploadDir: string;
  
  constructor( private readonly prismaService: PrismaService ) {
    this.uploadDir = path.resolve(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  uploadFile(file: Express.Multer.File): string {

    const filePath = path.join(this.uploadDir, file.fieldname);
  
    fs.writeFileSync(filePath, file.buffer);
  
    const fileUrl = `/uploads/${file.originalname}`;
    console.log('URL del archivo:', fileUrl);
    return fileUrl;
  }
  async create ( bookId: string, file: Express.Multer.File ){
  
    const filePath = path.join(this.uploadDir, file.fieldname);
  
    fs.writeFileSync(filePath, file.buffer);
  
    const fileUrl = `/uploads/${file.originalname}`;
    console.log('URL del archivo:', fileUrl);

    const createdFile = await this.prismaService.images.create({
      data: {
        file: fileUrl,
        book: {
          connect:{id:bookId},
        },
      }
    });
    return createdFile
  }
}
