import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';
import { Repository } from 'typeorm';
import { Currency, LogWallet, Wallet } from './entities';
import { WalletDto } from './dto/wallet.dto';
import { CurrencyDto } from './dto/currency.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private readonly wRepo: Repository<Wallet>,
        @InjectRepository(Currency)
        private readonly cRepo: Repository<Currency>,
        @InjectRepository(LogWallet)
        private readonly lRepo: Repository<LogWallet>,
        @InjectEntityManager()
        private entityManager: EntityManager,
        private configService: ConfigService
    ) {}

    public async getWalletsByIdUser(userId: number): Promise<Wallet[]> {
        const wallets = await this.entityManager.createQueryBuilder(Wallet, 'wallet')
            .innerJoinAndMapOne('wallet.currency', 'currency', 'currency', 'wallet.currencyId = currency.id')
            .leftJoinAndMapMany('wallet.logs', 'logwallet', 'logwallet', 'logwallet.walletFromId = wallet.id or logwallet.walletToId = wallet.id')
            .where('wallet.userId = :userId', {userId})
            .orderBy('wallet.id')
            .getMany();

        return wallets;
    }

    public async createWallet(wallet: WalletDto): Promise<Wallet> {
        return await this.wRepo.save(wallet);
    }

    public async getWallets(): Promise<Wallet[]> {
        return await this.wRepo.find();
    }

    public async createCurrency(currency: CurrencyDto): Promise<Currency> {
        const res = await this.cRepo.findOne({
            where: {
                name: currency.name
            }
        });

        if (res) {
            throw new BadRequestException(`"${currency.name}" is exists`);
        }

        return await this.cRepo.save(currency);
    }

    public async getCurrencyes(): Promise<Currency[]> {
        return await this.cRepo.find();
    }

    public async transfer({sum, walletFromId, walletToId}): Promise<LogWallet> {
        const wallets = await this.wRepo.find({
            id: In([walletFromId, walletToId])
        });

        if (wallets.length !== 2 || wallets[0].currencyId !== wallets[1].currencyId) {
            throw new BadRequestException();
        }

        const walletTo = wallets.find(({id}) => id === walletToId);
        const walletFrom = wallets.find(({id}) => id === walletFromId);

        const commission = sum / 100 * this.configService.get<number>('app.commission');
        walletFrom.sum = walletFrom.sum - commission - sum;
        walletTo.sum = walletTo.sum + sum;

        if (walletFrom.sum < sum) {
            throw new ForbiddenException('sum');
        }

        let status = true;
        const queryRunner = await this.entityManager.connection.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save([walletFrom, walletTo]);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            status = false
        } finally {
            await queryRunner.release();
        }

        try {
            return await this.lRepo.save({walletToId, walletFromId, sum, commission, status});
        } catch (err) {
            // Это исключение важно, есть много путей решений, вот два основных:
            // мы должны отменить коммит, так как лога по транзакции нет
            // либо записать ошибку с логом в файл, но при этом ничего не отменяя
            throw new Error(err);
        }
    }
}
