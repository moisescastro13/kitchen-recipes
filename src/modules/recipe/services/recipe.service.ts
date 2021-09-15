import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { plainToClass } from 'class-transformer';

import { CreateRecipeDto, ReadRecipeDto, UpdateRecipeDto } from '../dto';
import { Status } from '../../../shared/enums';

import { RecipeRepository } from '../recipe.repository';
import { IngredientRepository } from '../../ingredients/ingredients.repository';
import { CategoryRepository } from '../../categories/categories.repository';
import { UserRepository } from '../../user/user.repository';

import { IngredientEntity } from '../../ingredients/entities/ingredient.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { RecipeDetailsEntity } from '../entities/recipeDetails.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { RecipeEntity } from '../entities/Recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    private readonly _recipeRepository: RecipeRepository,
    @InjectRepository(IngredientRepository)
    private readonly _ingredientRepository: IngredientRepository,
    @InjectRepository(CategoryRepository)
    private readonly _categoryRepository: CategoryRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async create(
    userId: number,
    recipe: CreateRecipeDto,
  ): Promise<ReadRecipeDto> {
    const user = await this._userRepository.findOne(userId);
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
    return plainToClass(ReadRecipeDto, newRecipe);
  }

  async findAll(options: IPaginationOptions) {
    const recipes = await paginate<RecipeEntity>(
      this._recipeRepository,
      options,
      { where: { Status: Status.ACTIVE } },
    );
    const readRecipeDto = recipes.items.map(recipe =>
      plainToClass(ReadRecipeDto, recipe),
    );
    return {
      data: { items: readRecipeDto, meta: recipes.meta, links: recipes.links },
    };
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException();

    const recipe = await this._recipeRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });
    if (!recipe) throw new NotFoundException();

    return plainToClass(ReadRecipeDto, recipe);
  }

  async findByFilter(query: { author?: string; category?: string }) {
    let recipes: RecipeEntity[];
    const [categoryExist, authorExist] = await Promise.all([
      await this._categoryRepository.findOne({
        where: { name: query.category },
      }),
      await this._userRepository.findOne({
        where: { username: query.author },
      }),
    ]);
    /* if (!(category && author)) {
      recipes = await this._recipeRepository
        .createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.category', 'category')
        .leftJoinAndSelect('recipe.createdBy', 'createdBy')
        .leftJoinAndSelect('recipe.ingredients', 'ingredients')
        .where('recipe.createdBy = :user', { user: authorExist.id })
        .orWhere('recipe.category = :category', { category: categoryExist.id })
        .andWhere('recipe.Status = :Status', { Status: Status.ACTIVE })
        .getMany();
    } else { */
    //hay que refactorizar
    if (query.category) {
      recipes = await this._recipeRepository.find({
        where: {
          category: categoryExist,
          Status: Status.ACTIVE,
        },
      });
    } else if (query.author) {
      recipes = await this._recipeRepository.find({
        where: {
          createdBy: authorExist,
          Status: Status.ACTIVE,
        },
      });
    } else {
      recipes = await this._recipeRepository.find({
        where: {
          category: categoryExist,
          createdBy: authorExist,
          Status: Status.ACTIVE,
        },
      });
    }

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
