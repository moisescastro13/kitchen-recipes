import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RecipeDetailsEntity } from './recipeDetails.entity';
import { IngredientEntity } from '../../ingredients/entities/ingredient.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Status } from '../../../shared/enums';

@Entity('recipe')
export class RecipeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  urlImage?: string;

  @OneToOne(type => CategoryEntity, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToOne(type => UserEntity, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  createdBy: UserEntity;

  @OneToOne(type => RecipeDetailsEntity, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'details_id' })
  recipeDetails: RecipeDetailsEntity;

  @ManyToMany(type => IngredientEntity, ingredient => ingredient.recipes, {
    eager: true,
  })
  @JoinTable({ name: 'ingredients_recipes' })
  ingredients: IngredientEntity[];

  @Column({ default: false, type: 'boolean' })
  approved: boolean;

  @Column({ default: Status.ACTIVE, type: 'varchar', length: 8 })
  Status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
