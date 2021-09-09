import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecipeDetailsDto {
  @IsNotEmpty()
  @IsString()
  readonly preparation: string;

  @IsString()
  readonly description?: string;
}
