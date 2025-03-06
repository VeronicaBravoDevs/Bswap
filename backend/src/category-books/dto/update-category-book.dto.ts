import { PartialType } from '@nestjs/swagger';
import { CreateCategoryBookDto } from './create-category-book.dto';

export class UpdateCategoryBookDto extends PartialType(CreateCategoryBookDto) {}
