import { name as fakeName, datatype } from 'faker';
import { define } from 'typeorm-seeding';

import { UserDetailsEntity } from '../../modules/user/entities/userDetails.entity';

define(UserDetailsEntity, () => {
  const name = fakeName.firstName();
  const lastName = fakeName.lastName();

  const userdetails = new UserDetailsEntity();
  userdetails.name = name;
  userdetails.lastName = lastName;
  return userdetails;
});
