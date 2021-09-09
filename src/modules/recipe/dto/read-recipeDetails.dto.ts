import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadRecipeDetailsDto {
  @Expose()
  @IsString()
  readonly preparation: string;

  @Expose()
  @IsString()
  readonly description: string;
}
