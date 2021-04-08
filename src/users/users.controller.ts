import {Body, Controller, Delete, Get, Param, Post, Query, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import {UserDTO} from './dto/user.dto';

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
   * @api {get} /api/users/:id Get user
   * @apiName GetUsers
   * @apiGroup user
   *
   * @apiSuccess {object[]} users
   */
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
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
  async createUser(@Body() user: UserDTO) {
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
  async removeUserById(@Param('id') id: number) {
    await this.usersService.removeUserById(id);
  }
}