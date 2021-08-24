import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

import { ReadUserDetailDto } from './read-userDetail.dto';

@Exclude()
export class ReadUserDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @Type(type => ReadUserDetailDto)
  readonly detail: ReadUserDetailDto;
}
