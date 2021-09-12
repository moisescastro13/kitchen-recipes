import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

import { ReadUserDto } from '../../user/dto';
import { ReadCategoryDto } from '../../categories/dto';
import { ReadRecipeDetailsDto } from './read-recipeDetails.dto';
import { ReadIngredientDto } from '../../ingredients/dto/read-ingredient.dto';

@Exclude()
export class ReadRecipeDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @Type(type => ReadRecipeDetailsDto)
  readonly recipeDetails: ReadRecipeDetailsDto;

  @Expose()
  @Type(type => ReadCategoryDto)
  readonly category: ReadCategoryDto;

  @Expose()
  @Type(type => ReadUserDto)
  readonly createdBy: ReadUserDto;

  @Expose()
  @Type(type => ReadIngredientDto)
  readonly ingredients: ReadIngredientDto[];

  @Expose()
  readonly approved: boolean;
}
