import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientController } from './controllers/ingredients.controller';
import { IngredientService } from './services/ingredients.service';
import { IngredientRepository } from './ingredients.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientRepository, UserRepository])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientsModule {}
