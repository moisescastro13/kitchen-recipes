import { EntityRepository, getConnection, Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';

import { UserEntity } from '../user/entities/user.entity';
import { RoleEntity } from '../role/entities/role.entity';
import { SignUpDto } from './dto';
import { RoleType } from '../../shared/enums';
import { UserDetailsEntity } from '../user/entities/userDetails.entity';

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {
  async signUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;
    const user = new UserEntity();

    user.username = username;
    user.email = email;

    const roleRepository = await getConnection().getRepository(RoleEntity);
    const defaultRole = await roleRepository.findOne({
      where: { name: RoleType.GENERAL },
    });

    user.roles = [defaultRole];

    const details = new UserDetailsEntity();
    user.details = details;

    const salt = await genSalt(15);
    user.password = await hash(password, salt);

    user.save();
  }
}
