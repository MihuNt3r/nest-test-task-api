import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from '../domain/repositories/users.repository'
import { User } from '../domain/entities/user.entity'
import { Email } from '../domain/value-objects/users/email.vo'
import { Username } from '../domain/value-objects/users/username.vo'
import { Name } from '../domain/value-objects/users/name.vo'
import { UserId } from '../domain/value-objects/ids/user-id.vo'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(
    email: string,
    passwordHash: string,
    username: string,
    name: string,
  ): Promise<User> {
    const user = User.create(
      new Email(email),
      passwordHash,
      new Username(username),
      new Name(name),
    );

    await this.userRepository.save(user);
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(UserId.create(id));
    // Redo for Domain Exceptions
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const userEntity = await this.userRepository.findByEmail(new Email(email));
    if (!userEntity) throw new NotFoundException("User not found");
    return userEntity;
  }

  async getUserByUsername(username: string): Promise<User> {
    const userEntity = await this.userRepository.findByUsername(username);
    if (!userEntity) throw new NotFoundException("User not found");
    return userEntity;
  }

  async updateUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async deleteUser(user: User): Promise<void> {
    await this.userRepository.delete(user);
  }
}

