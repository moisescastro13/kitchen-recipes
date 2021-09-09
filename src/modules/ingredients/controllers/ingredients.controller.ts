import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IngredientService } from '../services/ingredients.service';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { Getuser } from '../../auth/decorators/user.decorator';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly _ingredientService: IngredientService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Getuser('id') userId: number,
    @Body() createIngredientDto: CreateIngredientDto,
  ) {
    return this._ingredientService.create(userId, createIngredientDto);
  }

  @Get()
  findAll() {
    return this._ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this._ingredientService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this._ingredientService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this._ingredientService.remove(id);
  }
}
