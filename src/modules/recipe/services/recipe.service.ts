import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { UserService } from '../../user/services/user.service';

import { CreateRecipeDto, ReadRecipeDto } from '../dto';

import { RecipeRepository } from '../recipe.repository';
import { IngredientRepository } from '../../ingredients/ingredients.repository';
import { CategoryRepository } from '../../categories/categories.repository';

import { IngredientEntity } from '../../ingredients/entities/ingredient.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Status } from '../../../shared/enums';
import { RecipeDetailsEntity } from '../entities/recipeDetails.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    private readonly _recipeRepository: RecipeRepository,
    @InjectRepository(IngredientRepository)
    private readonly _ingredientRepository: IngredientRepository,
    @InjectRepository(IngredientRepository)
    private readonly _categoryRepository: CategoryRepository,
    private readonly _userService: UserService,
  ) {}

  async create(userId: number, recipe: CreateRecipeDto) {
    const userdto = await this._userService.getOne(userId);
    const user: UserEntity = plainToClass(UserEntity, userdto);

    const category = await this._categoryRepository.findOne(recipe.category);

    if (!category) throw new NotFoundException('This Category does not exist');

    const ingredients: IngredientEntity[] = [];

    for (const ingredientId of recipe.ingredients) {
      const ingredient: IngredientEntity =
        await this._ingredientRepository.findOne(ingredientId, {
          where: { Status: Status.ACTIVE },
        });

      if (!ingredient) {
        throw new NotFoundException(
          `There's not ingredient with this id: ${ingredientId}`,
        );
      }

      ingredients.push(ingredient);
    }

    const recipeDetails = new RecipeDetailsEntity();
    Object.assign(recipeDetails, recipe.recipeDetails);

    const newRecipe = await this._recipeRepository.save({
      name: recipe.name,
      category,
      createdBy: user,
      recipeDetails,
      ingredients,
    });

    plainToClass(ReadRecipeDto, newRecipe);
  }

  async findAll() {
    const recipes = await this._recipeRepository.find();
    return recipes.map(recipe => plainToClass(ReadRecipeDto, recipe));
  }

  async findOne() {}
  async findByAuthor() {}
  async findByCategory() {}
  async update() {}

  async remove() {}
}
