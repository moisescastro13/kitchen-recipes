import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CreateRecipeDetailsDto } from './create-recipeDetails.dto';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  readonly category: number;

  @IsNotEmpty()
  readonly recipeDetails: CreateRecipeDetailsDto;

  @IsNotEmpty()
  @IsArray()
  readonly ingredients: number[];
}
