import {
    Injectable,
    NotFoundException,
    BadRequestException, HttpService, ForbiddenException,
} from '@nestjs/common';
import {getEntityManagerToken, InjectRepository, InjectEntityManager, InjectConnection} from '@nestjs/typeorm';
import {EntityManager, In, IsNull, Not} from 'typeorm';
import {Like, Repository} from 'typeorm';
import {Currency, LogWallet, Wallet} from './entities';
import {WalletDto} from './dto/wallet.dto';
import {CurrencyDto} from './dto/currency.dto';
import {configService} from '../config/config.service';

@Injectable()
export class WalletService {
    constructor(
        private httpService: HttpService,
        @InjectRepository(Wallet)
        private readonly wRepo: Repository<Wallet>,
        @InjectRepository(Currency)
        private readonly cRepo: Repository<Currency>,
        @InjectRepository(LogWallet)
        private readonly lRepo: Repository<LogWallet>,
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
    }

    public async getWalletsByIdUser(userId: number): Promise<Wallet[]> {
        const users = this.wRepo.find({userId})
        return users;
    }

    public async createWallet(wallet: WalletDto): Promise<Wallet> {
        return await this.wRepo.save(wallet);
    }

    public async createCurrency(currency: CurrencyDto): Promise<Currency> {
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

        const commission = sum / 100 * configService.get('COMMISSION');
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
            return await this.lRepo.save({walletToId, walletFromId, sum, commission, status});
        }
    }
}
