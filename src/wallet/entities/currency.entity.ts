import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '../../shared/entities';

@Entity('currency')
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({
    type: 'varchar'
  })
  public name: string;

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt
    };
  }
}
