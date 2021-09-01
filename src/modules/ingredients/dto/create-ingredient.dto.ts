import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
