import { RoleType } from '../../../shared/enums';

export interface IjwtPayload {
  id: number;
  username: string;
  email: string;
  roles: RoleType[];
}
