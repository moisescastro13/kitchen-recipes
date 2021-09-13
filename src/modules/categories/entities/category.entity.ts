import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { Status } from '../../../shared/enums';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'text' })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  description?: string;

  @ManyToOne(type => UserEntity, user => user.categorys, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  createdBy: UserEntity;

  @Column({ default: Status.ACTIVE, type: 'varchar', length: 8 })
  Status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
