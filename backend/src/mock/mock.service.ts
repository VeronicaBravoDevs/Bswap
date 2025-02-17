import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MockService {
  
  // Obtener libros simulados
  async getMockBooks(quantity: number = 50) {
    try {
      const response = await axios.get(`https://fakerapi.it/api/v2/books?_quantity=${quantity}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching mock books from FakerAPI');
    }
  }

  // Obtener usuarios simulados
  async getMockUsers(quantity: number = 10) {
    try {
      const response = await axios.get(`https://fakerapi.it/api/v2/users?_quantity=${quantity}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching mock users from FakerAPI');
    }
  }
}
