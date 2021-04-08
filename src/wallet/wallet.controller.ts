import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { WalletService } from './wallet.service';
import {WalletDto} from './dto/wallet.dto';
import {CurrencyDto} from './dto/currency.dto';
import {TransferDto} from './dto/transfer.dto';

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
   * @apiSuccess {object} -
   * @apiSuccess {number} -.id
   */
  @Post('currencyes')
  async createCurrency(@Body() currency: CurrencyDto) {
    const {id} = await this.walletsService.createCurrency(currency);
    return {id};
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
   * @api {get} /api/wallets Get all wallets
   * @apiName GetWallets
   * @apiGroup wallets
   *
   * @apiSuccess {object[]} wallet
   */
  @Get('')
  async getWallets() {
    return await this.walletsService.getWallets();
  }

  /**
   * @api {get} /api/wallets/:id Get wallets of user
   * @apiName GetWallets
   * @apiGroup wallets
   *
   * @apiSuccess {object[]} wallet
   */
  @Get(':id')
  async getWalletsByIdUser(@Param('id') id: number) {
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
   * @apiSuccess {object} -
   * @apiSuccess {number} -.id
   */
  @Post('')
  async createWallet(@Body() wallet: WalletDto) {
    const {id} = await this.walletsService.createWallet(wallet);
    return {id};
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
  async transfer(@Body() transfer: TransferDto) {
    return await this.walletsService.transfer(transfer);
  }
}