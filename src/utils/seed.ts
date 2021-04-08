import {ConnectionManager, ConnectionOptions} from "typeorm";
import {User} from '../users/entities';
import {Currency, Wallet} from '../wallet/entities';
import {ConfigService} from "@nestjs/config";
import {db} from "../config/config.service";

export default async () => {
    console.log("[Seed started]");

    const configService = new ConfigService({
        db: db()
    });

    const connectionManager = new ConnectionManager();
    const connection = connectionManager.create(configService.get<ConnectionOptions>('db'));

    await connection.connect();
    const userRepository = connection.getRepository(User);
    const walletRepository = connection.getRepository(Wallet);
    const currencyRepository = connection.getRepository(Currency);

    if (await userRepository.findOne()) {
        console.log("[Seed success]");
        return false;
    }

    console.log("[Creating User started]")
    const users = await userRepository.save([
        {name: 'michael'},
        {name: 'anna'}
    ])

    console.log("[Creating Currency finished]")

    const currency = await currencyRepository.save({name: 'ETH'})

    console.log("[Creating Wallet finished]");

    await walletRepository.save([{
        sum: 1000,
        currencyId: currency.id,
        userId: users[0].id
    }, {
        sum: 1000,
        currencyId: currency.id,
        userId: users[1].id
    }])

    await connection.close();
    console.log("[Seed success]");
};
