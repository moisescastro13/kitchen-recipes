import { Module } from '@nestjs/common';
import { IngredientService } from './services/ingredients.service';
import { IngredientController } from './controllers/ingredients.controller';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientsModule {}
