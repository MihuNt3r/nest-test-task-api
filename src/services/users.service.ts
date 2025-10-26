import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IUserRepository } from '../domain/repositories/users.repository'
import { User } from '../domain/entities/user.entity'
import { Email } from '../domain/value-objects/users/email.vo'
import { Username } from '../domain/value-objects/users/username.vo'
import { Name } from '../domain/value-objects/users/name.vo'
import { UserId } from '../domain/value-objects/ids/user-id.vo'
import { UserDto } from '../shared/dtos/users/user'
import { Role } from '../domain/value-objects/roles/role.vo'

@Injectable()
export class UsersService {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async createUser(
    email: string,
    passwordHash: string,
    username: string,
    name: string,
    role: Role
  ): Promise<User> {
    const user = User.create(
      new Email(email),
      passwordHash,
      new Username(username),
      new Name(name),
      role
    );

    await this.userRepository.save(user);
    return user;
  }

  async getUsers(): Promise<UserDto[]> {
    return await this.userRepository.findAll()
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(UserId.create(id));
    // Redo for Domain Exceptions
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    const userEntity = await this.userRepository.findByEmail(new Email(email));
    if (!userEntity) throw new NotFoundException("User not found");
    return userEntity;
  }

  async getUserByUsername(username: string): Promise<UserDto> {
    const userEntity = await this.userRepository.findByUsername(new Username(username));
    if (!userEntity) throw new NotFoundException("User not found");
    return userEntity;
  }

  async updateUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async deleteUser(userId: UserId): Promise<void> {
    await this.userRepository.delete(userId);
  }
}

