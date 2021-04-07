import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseIdEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;
}
