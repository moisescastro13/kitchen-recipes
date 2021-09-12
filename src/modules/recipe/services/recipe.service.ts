import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { UserService } from '../../user/services/user.service';

import { CreateRecipeDto, ReadRecipeDto, UpdateRecipeDto } from '../dto';
import { Status } from '../../../shared/enums';

import { RecipeRepository } from '../recipe.repository';
import { IngredientRepository } from '../../ingredients/ingredients.repository';
import { CategoryRepository } from '../../categories/categories.repository';

import { IngredientEntity } from '../../ingredients/entities/ingredient.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { RecipeDetailsEntity } from '../entities/recipeDetails.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    private readonly _recipeRepository: RecipeRepository,
    @InjectRepository(IngredientRepository)
    private readonly _ingredientRepository: IngredientRepository,
    @InjectRepository(CategoryRepository)
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
    const recipes = await this._recipeRepository.find({
      where: { Status: Status.ACTIVE },
    });
    return recipes.map(recipe => plainToClass(ReadRecipeDto, recipe));
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException();

    const recipe = await this._recipeRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });
    if (!recipe) throw new NotFoundException();

    return plainToClass(ReadRecipeDto, recipe);
  }

  async findByAuthor(autor: string) {
    if (!autor) throw new BadRequestException();

    const recipes = await this._recipeRepository.find({
      where: { createdBy: autor, Status: Status.ACTIVE },
    });
    if (!recipes) throw new NotFoundException('This Author has no recipes');

    return recipes.map(recipe => plainToClass(ReadRecipeDto, recipe));
  }

  async findByCategory(category: string) {
    const categoryExist = this._categoryRepository.findOne({
      where: { name: category, Status: Status.ACTIVE },
    });

    if (!categoryExist)
      throw new NotFoundException('This category does not exist');

    const recipes = await this._recipeRepository.find({
      where: { category: categoryExist, Status: Status.ACTIVE },
    });

    if (!recipes) throw new NotFoundException('This category has no recipes');

    return recipes.map(recipe => plainToClass(ReadRecipeDto, recipe));
  }

  async update(id: number, recipe: Partial<UpdateRecipeDto>) {
    const activeStatus = { where: { Status: Status.ACTIVE } };
    if (!id) throw new BadRequestException();
    const recipeExist = await this._recipeRepository.findOne(id, activeStatus);
    if (!recipeExist) throw new NotFoundException();

    if (recipe.category) {
      const category = await this._categoryRepository.findOne(
        recipe.category,
        activeStatus,
      );
      recipeExist.category = category;
    }
    if (recipe.ingredients) {
      recipeExist.ingredients = [];
      for (const ingredient of recipe.ingredients) {
        const newIngredient = await this._ingredientRepository.findOne(
          ingredient,
          activeStatus,
        );
        recipeExist.ingredients.push(newIngredient);
      }
    }

    if (recipe.name) recipeExist.name = recipe.name;
    if (recipe.recipeDetails) {
      recipeExist.recipeDetails.preparation = recipe.recipeDetails.preparation;
      recipeExist.recipeDetails.description = recipe.recipeDetails.description;
    }

    const updatedRecipe = await this._recipeRepository.save(recipeExist);
    return plainToClass(ReadRecipeDto, updatedRecipe);
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException();

    const recipe = await this._recipeRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });
    if (!recipe) throw new NotFoundException();
    await this._recipeRepository.update(id, { Status: Status.INACTIVE });
    return true;
  }
}
