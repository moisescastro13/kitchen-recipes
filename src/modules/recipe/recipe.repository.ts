import { EntityRepository, Repository } from 'typeorm';
import { RecipeEntity } from './entities/Recipe.entity';

@EntityRepository(RecipeEntity)
export class RecipeRepository extends Repository<RecipeEntity> {}
