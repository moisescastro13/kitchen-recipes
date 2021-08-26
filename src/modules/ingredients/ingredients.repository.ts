import { EntityRepository, Repository } from 'typeorm';
import { IngredientEntity } from './entities/ingredient.entity';

@EntityRepository(IngredientEntity)
export class IngredientRepository extends Repository<IngredientEntity> {}
