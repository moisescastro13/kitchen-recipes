import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Status } from '../../../shared/enums';
import { CategoryRepository } from '../categories.repository';
import { CreateCategoryDto } from '../dto';
import { ReadCategoryDto } from '../dto';
import { UpdateCategoryDto } from '../dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly _categoryRepository: CategoryRepository,
  ) {}

  async create(category: CreateCategoryDto): Promise<ReadCategoryDto> {
    if (!category) throw new BadRequestException();

    category.name.toLocaleUpperCase();
    const categoryExist = await this._categoryRepository.findOne({
      where: { name: category.name },
    });

    if (categoryExist)
      throw new ConflictException('This category already exist');

    const newCategory = await this._categoryRepository.save({
      name: category.name,
      description: category.description,
    });
    return plainToClass(ReadCategoryDto, newCategory);
  }

  async findAll(): Promise<ReadCategoryDto[]> {
    const categories: CategoryEntity[] = await this._categoryRepository.find({
      where: { Status: Status.ACTIVE },
    });

    return categories.map(category => plainToClass(ReadCategoryDto, category));
  }

  async findOne(id: number): Promise<ReadCategoryDto> {
    if (!id) throw new BadRequestException();

    const category = await this._categoryRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });
    if (!category) throw new NotFoundException();

    return plainToClass(ReadCategoryDto, category);
  }

  async update(
    id: number,
    updateCategoryDto: Partial<UpdateCategoryDto>,
  ): Promise<ReadCategoryDto> {
    if (!id) throw new BadRequestException();

    const category = await this._categoryRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });
    if (!category) throw new NotFoundException();

    const editedCategory = Object.assign(category, updateCategoryDto);
    const updatedCategory = await this._categoryRepository.save(editedCategory);

    return plainToClass(ReadCategoryDto, updatedCategory);
  }

  async remove(id: number): Promise<boolean> {
    if (!id) throw new BadRequestException();

    const category = await this._categoryRepository.findOne(id, {
      where: { Status: Status.ACTIVE },
    });
    if (!category) throw new NotFoundException();

    category.Status = Status.INACTIVE;
    await this._categoryRepository.save(category);

    return true;
  }
}
