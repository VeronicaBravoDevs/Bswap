import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryBooksService } from './category-books.service';
import { CreateCategoryBookDto } from './dto/create-category-book.dto';
import { UpdateCategoryBookDto } from './dto/update-category-book.dto';

@Controller('category-books')
export class CategoryBooksController {
  constructor(private readonly categoryBooksService: CategoryBooksService) {}

  @Post()
  create(@Body() createCategoryBookDto: CreateCategoryBookDto) {
    return this.categoryBooksService.create(createCategoryBookDto);
  }

  @Get()
  findAll() {
    return this.categoryBooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryBooksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryBookDto: UpdateCategoryBookDto) {
    return this.categoryBooksService.update(id, updateCategoryBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryBooksService.remove(id);
  }
}
