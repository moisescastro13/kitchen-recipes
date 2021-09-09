import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RecipeService } from '../services/recipe.service';
import { Roles } from '../../role/decorators/role.decorator';
import { RoleType } from '../../../shared/enums';
import { RoleGuard } from '../../role/guards/role.guard';
import { CreateRecipeDto } from '../dto';
import { Getuser } from '../../auth/decorators/user.decorator';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly _recipeService: RecipeService) {}

  @Post()
  @Roles(RoleType.ROOT, RoleType.ADMIN, RoleType.GENERAL)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @UsePipes(ValidationPipe)
  create(
    @Getuser('id') userId: number,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return this._recipeService.create(userId, createRecipeDto);
  }

  @Get()
  getAll() {
    return this._recipeService.findAll();
  }
}
