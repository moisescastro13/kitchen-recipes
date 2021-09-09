import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateRecipeDetailsDto } from './create-recipeDetails.dto';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  category: number;

  @IsNotEmpty()
  recipeDetails: CreateRecipeDetailsDto;

  @IsNotEmpty()
  @IsArray()
  ingredients: number[];
}
