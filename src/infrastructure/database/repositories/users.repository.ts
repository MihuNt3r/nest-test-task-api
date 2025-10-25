import { Inject, Injectable } from "@nestjs/common";
import { eq } from 'drizzle-orm'
import { users } from "../schema";
import { IUserRepository } from 'src/domain/repositories/users.repository'
import { User } from 'src/domain/entities/user.entity'
import { UserId } from 'src/domain/value-objects/ids/user-id.vo'
import { Email } from 'src/domain/value-objects/users/email.vo'
import { Username } from 'src/domain/value-objects/users/username.vo'
import { Name } from 'src/domain/value-objects/users/name.vo'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject("DRIZZLE") private db: any) {}

  async save(user: User): Promise<void> {
    const existing = await this.findById(user.id);
    if (existing) {
      // Update existing user
      await this.db
        .update(users)
        .set({
          email: user.email.getValue(),
          username: user.username.getValue(),
          name: user.name.getValue(),
          passwordHash: user.passwordHash,
        })
        .where(eq(users.id, user.id.getValue()));
    } else {
      // Insert new user
      await this.db.insert(users).values({
        id: user.id.getValue(),
        email: user.email.getValue(),
        username: user.username.getValue(),
        name: user.name.getValue(),
        passwordHash: user.passwordHash,
        createdAt: new Date(),
      });
    }
  }

  async findById(id: UserId): Promise<User | null> {
    const result = await this.db.query.users.findFirst({
      where: eq(users.id, id.getValue()),
    });
    if (!result) return null;

    return User.create(
      new Email(result.email),
      result.passwordHash,
      new Username(result.username),
      new Name(result.name),
    );
  }

  async findByEmail(email: Email): Promise<User | null> {
    const result = await this.db.query.users.findFirst({
      where: eq(users.email, email.getValue()),
    });
    if (!result) return null;

    return User.create(
      new Email(result.email),
      result.passwordHash,
      new Username(result.username),
      new Name(result.name),
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await this.db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (!result) return null;

    return User.create(
      new Email(result.email),
      result.passwordHash,
      new Username(result.username),
      new Name(result.name),
    );
  }

  async delete(user: User): Promise<void> {
    await this.db.delete(users).where(eq(users.id, user.id.getValue()));
  }
}
