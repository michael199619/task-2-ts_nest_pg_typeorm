import {ConnectionManager} from "typeorm";
import {configService} from '../config';
import {User} from '../users/entities';
import {Currency, Wallet} from '../wallet/entities';

const bootstrap = async () => {
    console.log("[Seed started]");

    const connectionManager = new ConnectionManager();
    const connection = connectionManager.create(configService.getOrmModuleOptions());

    await connection.connect();
    const userRepository = connection.getRepository(User);
    const walletRepository = connection.getRepository(Wallet);
    const currencyRepository = connection.getRepository(Currency);

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

bootstrap();
