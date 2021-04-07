import {BadRequestException, Body, Controller, Delete, Get, Post, Query, Req} from '@nestjs/common';
import { WalletService } from './wallet.service';
import {ReqData} from "../shared/decorators";
import {UserDTO} from "../users/dto/user.dto";
import {WalletDto} from "./dto/wallet.dto";
import {CurrencyDto} from "./dto/currency.dto";
import {TransferDto} from "./dto/transfer.dto";

@Controller('api/wallets')
export class WalletController {
  constructor(private walletsService: WalletService) {}

  /**
   *
   * @api {post} /api/wallets/currencyes create currency
   * @apiName createCurrency
   * @apiGroup wallets
   *
   * @apiParam {object} -
   * @apiParam {string} -.name
   *
   * @apiSuccess {number} id
   */
  @Post('currencyes')
  async createCurrency(@ReqData() currency: CurrencyDto) {
    const {id} = await this.walletsService.createCurrency(currency);
    return id;
  }

  /**
   *
   * @api {get} /api/wallets/currencyes get all currencyes
   * @apiName getCurrency
   * @apiGroup wallets
   *
   *
   * @apiSuccess {object[]} currency
   */
  @Get('currencyes')
  async getCurrencyes() {
    return await this.walletsService.getCurrencyes();
  }

  /**
   * @api {get} /api/wallets/:id Get wallets of user
   * @apiName GetWallets
   * @apiGroup wallets
   *
   * @apiSuccess {object[]} wallet
   */
  @Get(':id')
  async getUsers(@ReqData('id') id: number) {
    return await this.walletsService.getWalletsByIdUser(id);
  }
 
  /**
   * @api {post} /api/wallets create wallet
   * @apiName createWallet
   * @apiGroup wallets
   *
   * @apiParam {object} -
   * @apiParam {number} -.currencyId
   * @apiParam {number} -.userId
   *
   * @apiSuccess {number} id
   */
  @Post('')
  async getCurrentUser(@ReqData() wallet: WalletDto) {
    const {id} = await this.walletsService.createWallet(wallet);
    return id;
  }

  /**
   * @api {post} /api/wallets/transfer transfer
   * @apiName transferWallet
   * @apiGroup wallets
   *
   * @apiParam {object} -
   * @apiParam {number} -.sum
   * @apiParam {number} -.walletToId
   * @apiParam {number} -.walletFromId
   *
   * @apiSuccess {object} logWallet
   */
  @Post('transfer')
  async transfer(@ReqData() transfer: TransferDto) {
    return await this.walletsService.transfer(transfer);
  }
}