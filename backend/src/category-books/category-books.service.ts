import { Injectable } from '@nestjs/common';
import { CreateCategoryBookDto } from './dto/create-category-book.dto';
import { UpdateCategoryBookDto } from './dto/update-category-book.dto';

@Injectable()
export class CategoryBooksService {
  create(createCategoryBookDto: CreateCategoryBookDto) {
    return 'This action adds a new categoryBook';
  }

  findAll() {
    return `This action returns all categoryBooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryBook`;
  }

  update(id: number, updateCategoryBookDto: UpdateCategoryBookDto) {
    return `This action updates a #${id} categoryBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryBook`;
  }
}
