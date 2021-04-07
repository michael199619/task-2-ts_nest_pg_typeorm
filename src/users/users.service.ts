import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import {getEntityManagerToken, InjectRepository, InjectEntityManager, InjectConnection} from '@nestjs/typeorm';
import {EntityManager, In, IsNull, Not} from 'typeorm';
import {Like, Repository} from 'typeorm';
import {User} from './entities';
import {UserDTO} from "./dto/user.dto";
import {Wallet} from "../wallet/entities";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly uRepo: Repository<User>,
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
    }

    public async removeUserById(id: number) {
        await this.uRepo.delete(id);
    }

    public async getUsers(): Promise<User[]> {
        const users = await this.uRepo.find();
        return users;
    }

    public async createUser(user: UserDTO): Promise<User> {
        return await this.uRepo.save(user);
    }
}
