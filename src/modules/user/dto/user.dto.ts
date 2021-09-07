import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { RoleType } from '../../../shared/enums';
import { UserDetailsEntity } from '../entities/userDetails.entity';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  roles: RoleType[];

  detail: UserDetailsEntity;
}
