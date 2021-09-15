import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

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
  //@UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Getuser('id') userId: number,
    @Body() recipe: CreateRecipeDto,
    @UploadedFile() image,
  ) {
    return this._recipeService.create(userId, recipe, image);
  }

  @Get('/findByFilter')
  getByFilter(@Query() query) {
    return this._recipeService.findByFilter(query);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._recipeService.findOne(id);
  }

  @Get()
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this._recipeService.findAll({
      page,
      limit,
      route: 'http://localhost:3000/api/recipe',
    });
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
