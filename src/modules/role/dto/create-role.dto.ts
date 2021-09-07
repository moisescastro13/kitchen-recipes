import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from '../../../shared/enums';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(RoleType, {
    message: `Valid roles are ${Object.values(RoleType)}`,
  })
  name: string;

  @IsString()
  description: string;
}
