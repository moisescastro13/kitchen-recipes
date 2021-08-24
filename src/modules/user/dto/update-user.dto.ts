import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ReadUserDetailDto } from './read-userDetail.dto';

export class UpdateUserDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly userName: string;

  @IsEmail()
  readonly email: string;

  @Type(type => ReadUserDetailDto)
  readonly detail: ReadUserDetailDto;
}
