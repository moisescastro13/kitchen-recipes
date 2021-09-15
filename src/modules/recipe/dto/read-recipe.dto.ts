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
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @Type(type => ReadRecipeDetailsDto)
  recipeDetails: ReadRecipeDetailsDto;

  @Expose()
  @Type(type => ReadCategoryDto)
  category: ReadCategoryDto;

  @Expose()
  @Type(type => ReadUserDto, {
    discriminator: { property: 'roles', subTypes: [] },
  })
  createdBy: ReadUserDto;

  @Expose()
  @Type(type => ReadIngredientDto)
  ingredients: ReadIngredientDto[];

  @Expose()
  approved: boolean;
}
