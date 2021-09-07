import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { Status } from '../../../shared/enums';
import { ReadRoleDto } from '../dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleEntity } from '../entities/role.entity';
import { RoleRepository } from '../role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleExist: RoleEntity = await this._roleRepository.findOne({
      where: { name: createRoleDto.name, status: Status.ACTIVE },
    });

    if (roleExist) throw new ConflictException('this role already exist');

    const newRole: RoleEntity = await this._roleRepository.save({
      name: createRoleDto.name,
      description: createRoleDto.description,
    });
    return plainToClass(ReadRoleDto, newRole);
  }

  async findAll(): Promise<ReadRoleDto[]> {
    const roles: RoleEntity[] = await this._roleRepository.find({
      where: { status: Status.ACTIVE },
    });
    return roles.map((role: RoleEntity) => plainToClass(ReadRoleDto, role));
  }

  async findOne(id: number): Promise<ReadRoleDto> {
    if (!id) throw new BadRequestException();

    const roleExist: RoleEntity = await this._roleRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });

    if (!roleExist) throw new NotFoundException('This role does not exist');

    return plainToClass(ReadRoleDto, roleExist);
  }

  async update(id: number, updateRoleDto: Partial<UpdateRoleDto>) {
    if (!id) throw new BadRequestException();

    const roleExist: RoleEntity = await this._roleRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });

    if (!roleExist) throw new NotFoundException('This role does not exist');

    const editedRole = Object.assign(roleExist, updateRoleDto);
    await this._roleRepository.update(id, editedRole);

    return plainToClass(ReadRoleDto, editedRole);
  }

  async remove(id: number): Promise<boolean> {
    if (!id) throw new BadRequestException();

    const roleExist: RoleEntity = await this._roleRepository.findOne({
      where: { status: Status.ACTIVE },
    });

    if (!roleExist) throw new NotFoundException('This role does not exist');

    await this._roleRepository.update(id, { status: Status.INACTIVE });
    return true;
  }
}
