import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MockService } from 'src/mock/mock.service';
import * as bcrypt from 'bcryptjs';

const roundOfHashing = 10;

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mockService: MockService,
  ) {}

  async seedDatabase() {
    try {
      const existingUsers = await this.prismaService.user.findMany();
      if (existingUsers.length > 0) {
        this.logger.warn('⚠️ Database already contains users. Skipping seeding.');
        return;
      }

      // Obtener usuarios mock
      const mockUsers = await this.mockService.getMockUsers(10);
      for (const mockUser of mockUsers.data) {
        const hashedPassword = await bcrypt.hash('password123', roundOfHashing);

        // Crear usuario en la base de datos
        const createdUser = await this.prismaService.user.create({
          data: {
            name: `${mockUser.firstname} ${mockUser.lastname}`,
            email: mockUser.email.toLowerCase(),
            password_hash: hashedPassword,
            phone: mockUser.phone,
            city: mockUser.address.city,
            country: mockUser.address.country
             
          },
        });


        const mockBooks = await this.mockService.getMockBooks(50);
        const userBooks = mockBooks.data.slice(0, 3);
        for (const book of userBooks) {
          await this.prismaService.book.create({
            data: {
              title: book.title, 
              author: book.author,
              description: book.description,
              genre:book.genre,
              published: new Date(book.published),
              publisher: book.publisher, 
              userId: createdUser.id, 
              isbn: book.isbn,
            },
          });
        }
      }

      this.logger.log('✅ Database seeded successfully with mock users and books.');
    } catch (error) {
      this.logger.error('❌ Error seeding database:', error);
    }
  }
}
