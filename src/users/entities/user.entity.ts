import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../shared/entities';
import {Wallet} from "../../wallet/entities";

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar'
  })
  public name: string;

  public wallets: Wallet[];

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      wallets: this.wallets,
      createdAt: this.createdAt,
    };
  }
}
