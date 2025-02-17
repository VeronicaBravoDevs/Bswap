import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MockService } from 'src/mock/mock.service';

@Module({
  imports: [PrismaModule],
  providers: [SeedService, MockService],
  exports: [SeedService],
})
export class SeedModule {}
