import { Inject, Injectable, NotImplementedException } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { users } from "../schema";
import { IUserRepository } from 'src/domain/repositories/users.repository'
import { User } from 'src/domain/entities/user.entity'
import { UserDto } from 'src/shared/dtos/users/user'
import { UserId } from '../../../domain/value-objects/ids/user-id.vo'
import { Email } from '../../../domain/value-objects/users/email.vo'
import { Username } from '../../../domain/value-objects/users/username.vo'
import { DrizzleAsyncProvider } from '../provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../schema'
import { UserWithPasswordDto } from '../../../shared/dtos/users/user-with-password'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) { }

  async save(user: User): Promise<void> {
    await this.db.insert(users).values({
      id: user.id.toString(),
      email: user.email.getValue().toString(),
      username: user.username.getValue().toString(),
      name: user.name.getValue().toString(),
      passwordHash: user.passwordHash,
      role: user.role.toString(),
    });
  }

  async findById(id: UserId): Promise<UserDto | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id.toString()));

    if (!user) {
      return null;
    }

    return { email: user.email, name: user.name, username: user.username } as UserDto;
  }

  async findByEmail(email: Email): Promise<UserWithPasswordDto | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email.getValue().toString()));

    if (!user) {
      return null;
    }

    return {
      email: user.email,
      name: user.name,
      username: user.username,
      passwordHash: user.passwordHash
    } as UserWithPasswordDto;
  }

  async findByUsername(username: Username): Promise<UserDto | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username.getValue().toString()));

    if (!user) {
      return null;
    }

    return { email: user.email, name: user.name, username: user.username } as UserDto;
  }

  async findAll(): Promise<UserDto[]> {
    const dbUsers = await this.db.select().from(users);

    return dbUsers.map((dbUser) => ({ email: dbUser.email, name: dbUser.name, username: dbUser.username}));
  }

  async update(id: string, data: Partial<User>): Promise<UserDto> {
    throw new NotImplementedException();
  }

  async delete(id: UserId): Promise<void> {
    throw new NotImplementedException();
  }
}