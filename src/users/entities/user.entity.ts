import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../shared/entities';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar'
  })
  public name: string;

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
    };
  }
}
