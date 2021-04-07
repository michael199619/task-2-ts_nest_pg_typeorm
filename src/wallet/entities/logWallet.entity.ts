import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from '../../shared/entities';

@Entity('logWallet')
export class LogWallet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int', unsigned: true, nullable: false
    })
    public walletToId: number;

    @Column({
        type: 'int', unsigned: true, nullable: false
    })
    public walletFromId: number;

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
        type: 'numeric',
        default: 0,
        nullable: false,
        transformer: {
            to: value => value,
            from: value => +value
        }
    })
    public commission: number;

    @Column({
        type: 'boolean', nullable: false, default: false
    })
    public status: boolean;

    toJSON() {
        return {
            id: this.id,
            sum: this.sum,
            status: this.status,
            walletFromId: this.walletFromId,
            walletToId: this.walletToId,
            commission: this.commission,
            createdAt: this.createdAt
        };
    }
}
