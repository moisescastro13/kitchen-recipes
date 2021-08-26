import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IngredientService } from '../services/ingredients.service';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly _ingredientService: IngredientService) {}

  @Post(':userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createIngredientDto: CreateIngredientDto,
  ) {
    return this._ingredientService.create(userId, createIngredientDto);
  }

  @Get()
  findAll() {
    return this._ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._ingredientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this._ingredientService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._ingredientService.remove(+id);
  }
}
