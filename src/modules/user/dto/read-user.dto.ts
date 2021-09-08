import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

import { ReadRoleDto } from '../../role/dto';
import { ReadUserDetailDto } from './read-userDetail.dto';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @Type(type => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;

  @Expose()
  @Type(type => ReadRoleDto, {
    discriminator: { property: 'id', subTypes: [] },
  })
  readonly roles: ReadRoleDto[];
}
