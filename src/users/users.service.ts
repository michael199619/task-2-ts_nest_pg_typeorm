import {Injectable} from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {Repository} from 'typeorm';
import {User} from './entities';
import {UserDTO} from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly uRepo: Repository<User>,
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
    }

    public async removeUserById(id: number) : Promise<void> {
        await this.uRepo.delete(id);
    }

    public async getUsers(): Promise<User[]> {
        const users = await this.uRepo.find();
        return users;
    }

    public async getUserById(id: number): Promise<User> {
        const user = await this.entityManager.createQueryBuilder(User, 'user')
            .leftJoinAndMapMany('user.wallets', 'wallet', 'wallet', 'wallet.userId = user.id')
            .where('user.id = :id', {id})
            .getOne();

        return user;
    }

    public async createUser(user: UserDTO): Promise<User> {
        return await this.uRepo.save(user);
    }
}
