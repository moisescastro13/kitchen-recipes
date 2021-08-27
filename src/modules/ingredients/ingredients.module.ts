import { Module } from '@nestjs/common';
import { IngredientService } from './services/ingredients.service';
import { IngredientController } from './controllers/ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientRepository } from './ingredients.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientRepository, UserRepository])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientsModule {}
