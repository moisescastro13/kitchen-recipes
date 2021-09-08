import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { Status } from '../../../shared/enums/Status.enum';
import { ReadUserDto, UpdateUserDto } from '../dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../user.repository';
import { RoleRepository } from '../../role/role.repository';
import { RoleEntity } from '../../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async setRoleToUser(roleId: number, userId: number) {
    if (!userId) throw new BadRequestException();
    if (!roleId) throw new BadRequestException();

    const roleExist: RoleEntity = await this._roleRepository.findOne(roleId, {
      where: { status: Status.ACTIVE },
    });
    if (!roleExist) throw new NotFoundException('This role does not exist');

    const userExist: UserEntity = await this._userRepository.findOne(userId, {
      where: { Status: Status.ACTIVE },
    });
    if (!userExist) throw new NotFoundException('This user does not exist');

    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);
    return true;
  }

  async getAll(): Promise<ReadUserDto[]> {
    const users = await this._userRepository.find({
      where: { Status: Status.ACTIVE },
    });
    return users.map((user: UserEntity) => plainToClass(ReadUserDto, user));
  }

  async getOne(id: number): Promise<ReadUserDto> {
    if (!id) throw new BadRequestException();

    const userExist: UserEntity = await this._userRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });
    if (!userExist) throw new NotFoundException();

    return plainToClass(ReadUserDto, userExist);
  }

  async update(id: number, user: Partial<UpdateUserDto>): Promise<ReadUserDto> {
    if (!id) throw new BadRequestException();

    const userExist: UserEntity = await this._userRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });
    if (!userExist) throw new NotFoundException();

    const editedUser = Object.assign(userExist, user);
    const updatedUser = await this._userRepository.save(editedUser);

    return plainToClass(ReadUserDto, updatedUser);
  }

  async delete(id: number): Promise<boolean> {
    if (!id) throw new BadRequestException();

    const userExist: UserEntity = await this._userRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });
    if (!userExist) throw new NotFoundException();

    await this._userRepository.update(id, { Status: Status.INACTIVE });
    return true;
  }
}
