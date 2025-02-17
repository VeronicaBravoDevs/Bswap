import { Controller, Get } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  
  @Get('data')
  async getMockBooks() {
    return this.mockService.getMockBooks();
  }
  @Get('data')
  async getMockUsers() {
    return this.mockService.getMockUsers();
  }
}
