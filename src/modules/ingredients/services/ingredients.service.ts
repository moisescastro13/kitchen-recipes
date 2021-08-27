import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { IngredientRepository } from '../ingredients.repository';
import { UserRepository } from '../../user/user.repository';
import { Status } from '../../../shared/enums';
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

    //if (!userExist) throw new NotFoundException();

    const savedIngredient: IngredientEntity =
      await this._ingredientRepository.save({
        name: createIngredientDto.name,
        description: createIngredientDto.description,
        //createBy: userExist,
      });
    return plainToClass(ReadIngredientDto, savedIngredient);
  }

  async findAll(): Promise<ReadIngredientDto[]> {
    const ingredients: IngredientEntity[] =
      await this._ingredientRepository.find({
        where: { Status: Status.ACTIVE },
      });

    return ingredients.map(ingredient =>
      plainToClass(ReadIngredientDto, ingredient),
    );
  }

  async findOne(id: number): Promise<ReadIngredientDto> {
    if (!id) throw new BadRequestException();

    const ingredient: IngredientEntity =
      await this._ingredientRepository.findOne(id, {
        where: { Status: Status.ACTIVE },
      });

    return plainToClass(ReadIngredientDto, ingredient);
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
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
