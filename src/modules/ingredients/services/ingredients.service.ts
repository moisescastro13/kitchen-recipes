import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

import { CreateIngredientDto } from '../dto/create-ingredient.dto';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { IngredientRepository } from '../ingredients.repository';
import { UserRepository } from '../../user/user.repository';
import { Status, IResultHttpRequest } from '../../../shared';
import { UserEntity } from '../../user/entities/user.entity';
import { IngredientEntity } from '../entities/ingredient.entity';
import { plainToClass } from 'class-transformer';
import { ReadIngredientDto } from '../dto/read-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientRepository)
    private readonly _ingredientRepository: IngredientRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async create(
    userId: number,
    createIngredientDto: CreateIngredientDto,
  ): Promise<ReadIngredientDto> {
    if (!userId) throw new BadRequestException();

    const userExist: UserEntity = await this._userRepository.findOne(userId, {
      where: { Status: Status.ACTIVE },
    });

    if (!userExist) throw new NotFoundException();

    const savedIngredient: IngredientEntity =
      await this._ingredientRepository.save({
        name: createIngredientDto.name,
        description: createIngredientDto.description,
        createBy: userExist,
      });
    return plainToClass(ReadIngredientDto, savedIngredient);
  }

  async findAll(options: IPaginationOptions) {
    const ingredients = await paginate(this._ingredientRepository, options, {
      where: { Status: Status.ACTIVE },
    });
    const readIngredientDto = ingredients.items.map(ingredient =>
      plainToClass(ReadIngredientDto, ingredient),
    );
    const data: IResultHttpRequest = {
      items: readIngredientDto,
      meta: ingredients.meta,
      links: ingredients.links,
    };
    return {
      data,
    };
  }

  async findOne(id: number): Promise<ReadIngredientDto> {
    if (!id) throw new BadRequestException();

    const ingredient: IngredientEntity =
      await this._ingredientRepository.findOne(id, {
        where: { Status: Status.ACTIVE },
      });

    return plainToClass(ReadIngredientDto, ingredient);
  }

  async update(
    id: number,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<ReadIngredientDto> {
    const ingredient = await this._ingredientRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });

    if (!ingredient) throw new NotFoundException();

    const editedIngredient = Object.assign(ingredient, updateIngredientDto);
    const updatedIngredient = await this._ingredientRepository.save(
      editedIngredient,
    );
    return plainToClass(ReadIngredientDto, updatedIngredient);
  }

  async remove(id: number): Promise<void> {
    if (!id) throw new BadRequestException();

    const ingredientExist: IngredientEntity =
      await this._ingredientRepository.findOne(id, {
        where: { Status: Status.ACTIVE },
      });

    if (!ingredientExist) throw new NotFoundException();

    await this._ingredientRepository.update(id, { Status: Status.INACTIVE });
  }
}
