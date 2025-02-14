import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MockService {
  async getMockData() {
    try {
      const response = await axios.get('https://fakerapi.it/api/v2/books?_quantity=50');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching mock data from FakerAPI');
    }
  }
}