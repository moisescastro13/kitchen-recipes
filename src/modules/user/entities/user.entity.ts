import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserDetailsEntity } from './userDetails.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { Status } from '../../../shared/enums';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { IngredientEntity } from '../../ingredients/entities/ingredient.entity';
import { RecipeEntity } from '../../recipe/entities/Recipe.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToOne(tpye => UserDetailsEntity, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetailsEntity;

  @OneToMany(type => CategoryEntity, category => category.createdBy)
  categorys: CategoryEntity[];

  @OneToMany(type => IngredientEntity, ingredient => ingredient.createBy)
  ingredients: IngredientEntity[];

  @OneToMany(type => RecipeEntity, recipe => recipe.createdBy)
  recipes: RecipeEntity[];

  @ManyToMany(type => RoleEntity, role => role.users, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: RoleEntity[];

  @Column({ default: Status.ACTIVE, type: 'varchar', length: 8 })
  Status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
