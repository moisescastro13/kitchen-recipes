import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../../shared/enums';

export const Roles = (...roles: string[] | RoleType[]) =>
  SetMetadata('roles', roles);
