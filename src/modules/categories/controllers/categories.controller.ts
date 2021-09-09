import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoriesService: CategoriesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this._categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this._categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<UpdateCategoryDto>,
  ) {
    return this._categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._categoriesService.remove(+id);
  }
}
