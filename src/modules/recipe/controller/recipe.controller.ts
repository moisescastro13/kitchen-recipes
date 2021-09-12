import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RecipeService } from '../services/recipe.service';
import { Roles } from '../../role/decorators/role.decorator';
import { RoleType } from '../../../shared/enums';
import { RoleGuard } from '../../role/guards/role.guard';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto';
import { Getuser } from '../../auth/decorators/user.decorator';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly _recipeService: RecipeService) {}

  @Post()
  @Roles(RoleType.ROOT, RoleType.ADMIN, RoleType.GENERAL)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @UsePipes(ValidationPipe)
  create(@Getuser('id') userId: number, @Body() recipe: CreateRecipeDto) {
    return this._recipeService.create(userId, recipe);
  }

  @Get()
  getAll() {
    return this._recipeService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._recipeService.findOne(id);
  }

  @Get()
  getByAuthor(@Query() { author }) {
    return this._recipeService.findByAuthor(author);
  }
  @Get()
  getByCategory(@Query() { category }) {
    return this._recipeService.findByCategory(category);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() recipe: Partial<UpdateRecipeDto>,
  ) {
    return this._recipeService.update(id, recipe);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this._recipeService.remove(id);
  }
}
