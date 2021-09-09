import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ReadUserDto } from '../../user/dto';

@Exclude()
export class ReadIngredientDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @Type(type => ReadUserDto, {
    discriminator: {
      property: 'roles',
      subTypes: [],
    },
  })
  readonly createBy: ReadUserDto;
}
