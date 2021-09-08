import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeController } from './controller/recipe.controller';
import { RecipeService } from './services/recipe.service';
import { RecipeRepository } from './recipe.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeRepository])],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
