import { UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseIdEntity } from './base-id.entity';

export abstract class BaseEntity extends BaseIdEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  public readonly createdAt: string;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: string;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz', select: false })
  public deletedAt: string;
}
