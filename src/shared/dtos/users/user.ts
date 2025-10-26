import { UserWithPasswordDto } from './user-with-password'

export type UserDto = Omit<UserWithPasswordDto, 'passwordHash'>