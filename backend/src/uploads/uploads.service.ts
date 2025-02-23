import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';

@Injectable()
export class UploadsService {
  private uploadDir: string;

  constructor() {
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
  
}
