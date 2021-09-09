import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeController } from './controller/recipe.controller';
import { RecipeService } from './services/recipe.service';
import { RecipeRepository } from './recipe.repository';
import { IngredientRepository } from '../ingredients/ingredients.repository';
import { UserModule } from '../user/user.module';
import { CategoryRepository } from '../categories/categories.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeRepository,
      IngredientRepository,
      CategoryRepository,
    ]),
    UserModule,
  ],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
