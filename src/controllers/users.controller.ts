import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { UpdateUserDto } from 'src/shared/dtos/users/update-user'
import { CreateUserDto } from 'src/shared/dtos/users/create-user'
import { User } from 'src/domain/entities/user.entity'
import { UsersService } from 'src/services/users.service'
import { UserDto } from '../shared/dtos/users/user'
import { UserId } from '../domain/value-objects/ids/user-id.vo'
import { parseRole } from '../shared/helpers/helpers'
import { Roles } from '../decorators/roles.decorator'
import { Role } from '../domain/value-objects/roles/role.vo'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const role = parseRole(dto.role);

    return this.usersService.createUser(dto.email, dto.passwordHash, dto.username, dto.name, role);
  }

  @Get('')
  @Roles(Role.ADMIN)
  async getUsers(): Promise<Array<UserDto>> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  async getUser(@Param('id') id: string): Promise<UserDto> {
    // if (currentUser.role === Role.USER && currentUser.id !== id) {
    //   throw new ForbiddenException('You can only update your own profile.');
    // }

    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.USER)
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<void> {
    // if (currentUser.role === Role.USER && currentUser.id !== id) {
    //   throw new ForbiddenException('You can only update your own profile.');
    // }

    // const user = await this.usersService.getUserById(id);
    // await this.usersService.updateUser(user);
    throw new NotImplementedException();
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(UserId.create(id));
  }
}
