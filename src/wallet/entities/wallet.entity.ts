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
import {User} from "../../users/entities";
import {Currency} from "./currency.entity";
import {LogWallet} from "./logWallet.entity";

@Entity('wallet')
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'numeric',
    default: 0,
    nullable: false,
    transformer: {
      to: value => value,
      from: value => +value
    }
  })
  public sum: number;

  @Column({
    type: 'int', unsigned: true, nullable: false
  })
  public currencyId: number;
  currency: Currency;
  logs: LogWallet;

  @Column({
    type: 'int', unsigned: true, nullable: false
  })
  public userId: number;

  toJSON() {
    return {
      id: this.id,
      sum: this.sum,
      currency: this.currency,
      userId: this.userId,
      logs: this.logs,
      currencyId: this.currencyId,
      createdAt: this.createdAt
    };
  }
}
