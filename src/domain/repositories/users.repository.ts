import { User } from "../entities/user.entity";
import { Email } from "../value-objects/users/email.vo";
import { UserId } from "../value-objects/ids/user-id.vo";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  delete(user: User): Promise<void>;
}