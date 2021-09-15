import { datatype, internet } from 'faker';
import { define, factory } from 'typeorm-seeding';

import { UserEntity } from '../../modules/user/entities/user.entity';
import { UserDetailsEntity } from '../../modules/user/entities/userDetails.entity';

define(UserEntity, () => {
  const username = internet.userName();
  const email = internet.email(username);

  const user = new UserEntity();
  user.username = username;
  user.email = email;
  user.password = '123456789';
  user.details = factory(UserDetailsEntity)() as any;
  return user;
});
