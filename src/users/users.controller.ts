 import {BadRequestException, Body, Controller, Delete, Get, Post, Query, Req} from '@nestjs/common';
import {classToPlain} from 'class-transformer';
import { UsersService } from './users.service';
import {  ReqData } from '../shared/decorators';
import {UserDTO} from "./dto/user.dto";

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  /**
   * @api {get} /api/users Get all users
   * @apiName GetUsers
   * @apiGroup user
   *
   * @apiSuccess {object[]} users
   */
  @Get('')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  /**
   * @api {post} /api/users create user
   * @apiName createUser
   * @apiGroup user
   *
   * @apiParam {object} -
   * @apiParam {string} -.name
   *
   * @apiSuccess {object} -
   * @apiSuccess {number} -.id
   */
  @Post('')
  async createUser(@ReqData() user: UserDTO) {
    const {id} = await this.usersService.createUser(user);
    return {id};
  }

  /**
   * @api {delete} /api/users/:id remove user
   * @apiName removeUser
   * @apiGroup user
   *
   * @apiParam (query string) {number} id
   */
  @Delete(':id')
  async removeUserById(@ReqData('id') id: number) {
    await this.usersService.removeUserById(id);
  }
}