import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RoleType } from '../../../shared/enums';

@Exclude()
export class ReadRoleDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsEnum(RoleType)
  name: string;

  @Expose()
  @IsString()
  description: string;
}
