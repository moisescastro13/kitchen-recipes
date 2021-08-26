import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Status } from '../../../shared/enums';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('ingredients')
export class IngredientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 80, nullable: false })
  name: string;

  @Column({ type: 'text', length: 150, nullable: true })
  description: string;

  @OneToOne(type => UserEntity, { cascade: true, nullable: true, eager: true })
  @JoinColumn({ name: 'user_id' })
  createBy: UserEntity;

  @Column({ default: Status.ACTIVE, type: 'varchar', length: 8 })
  Status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
