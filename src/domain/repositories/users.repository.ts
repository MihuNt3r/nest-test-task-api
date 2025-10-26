import { User } from '../entities/user.entity'
import { Email } from '../value-objects/users/email.vo'
import { UserId } from '../value-objects/ids/user-id.vo'
import { UserDto } from '../../shared/dtos/users/user'
import { Username } from '../value-objects/users/username.vo'
import { UserWithPasswordDto } from '../../shared/dtos/users/user-with-password'

export interface IUserRepository {
  save(user: User): Promise<void>
  findAll(): Promise<UserDto[]>
  findById(id: UserId): Promise<UserDto | null>
  findByEmail(email: Email): Promise<UserWithPasswordDto | null>
  findByUsername(username: Username): Promise<UserDto | null>
  delete(id: UserId): Promise<void>
}
