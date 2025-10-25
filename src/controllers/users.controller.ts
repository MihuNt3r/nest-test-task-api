import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateUserDto } from 'src/shared/dtos/users/update-user'
import { CreateUserDto } from 'src/shared/dtos/users/create-user'
import { User } from 'src/domain/entities/user.entity'
import { UsersService } from 'src/services/users.service'

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto.email, dto.passwordHash, dto.username, dto.name);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<void> {
    const user = await this.usersService.getUserById(id);
    await this.usersService.updateUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const user = await this.usersService.getUserById(id);
    await this.usersService.deleteUser(user);
  }
}
