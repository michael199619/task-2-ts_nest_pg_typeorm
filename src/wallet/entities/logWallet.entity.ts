import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from '../../shared/entities';
import {Wallet} from './wallet.entity';

@Entity('logwallet')
export class LogWallet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    walletFrom: Wallet;
    @Column({
        type: 'int', unsigned: true, nullable: false
    })
    public walletToId: number;

    walletTo: Wallet;
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
            walletFrom: this.walletFrom,
            walletTo: this.walletTo,
            walletFromId: this.walletFromId,
            walletToId: this.walletToId,
            commission: this.commission,
            createdAt: this.createdAt
        };
    }
}
