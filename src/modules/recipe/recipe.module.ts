import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './controller/recipe.controller';
import { RecipeRepository } from './recipe.repository';
import { RecipeService } from './services/recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeRepository])],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
