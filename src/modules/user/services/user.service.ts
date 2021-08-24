import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { userStatus } from '../../../shared/enums/UserStatus.enum';
import { ReadUserDto, UpdateUserDto } from '../dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async getAll(): Promise<ReadUserDto[]> {
    const users = await this._userRepository.find({
      where: { Status: userStatus.ACTIVE },
    });
    return users.map((user: UserEntity) => plainToClass(ReadUserDto, user));
  }

  async getOne(id: number): Promise<ReadUserDto> {
    if (!id) throw new BadRequestException();

    const userExist: UserEntity = await this._userRepository.findOne(id, {
      where: { Status: userStatus.ACTIVE },
    });
    if (!userExist) throw new NotFoundException();

    return plainToClass(ReadUserDto, userExist);
  }

  async update(id: number, user: UpdateUserDto): Promise<ReadUserDto> {
    if (!id) throw new BadRequestException();

    const userExist: UserEntity = await this._userRepository.findOne(id, {
      where: { Status: userStatus.ACTIVE },
    });
    if (!userExist) throw new NotFoundException();

    userExist.userName = user.userName;
    userExist.email = user.email;
    const savedUser = await userExist.save();
    return plainToClass(ReadUserDto, savedUser);
  }

  async delete(id: number): Promise<boolean> {
    if (!id) throw new BadRequestException();

    const userExist: UserEntity = await this._userRepository.findOne(id, {
      where: { Status: userStatus.ACTIVE },
    });
    if (!userExist) throw new NotFoundException();

    userExist.Status = userStatus.INACTIVE;
    await userExist.save();
    return true;
  }
}
