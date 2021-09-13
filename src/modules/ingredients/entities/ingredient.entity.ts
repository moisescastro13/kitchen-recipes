import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Status } from '../../../shared/enums';
import { UserEntity } from '../../user/entities/user.entity';
import { RecipeEntity } from '../../recipe/entities/Recipe.entity';

@Entity('ingredients')
export class IngredientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 80, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(type => UserEntity, { cascade: true, nullable: true, eager: true })
  @JoinColumn({ name: 'user_id' })
  createBy: UserEntity;

  @Column({ default: Status.ACTIVE, type: 'varchar', length: 8 })
  Status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(type => RecipeEntity, recipe => recipe.ingredients)
  @JoinColumn()
  recipes: RecipeEntity[];
}
