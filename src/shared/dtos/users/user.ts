import { CreateUserDto } from './create-user'

export type UserDto = Omit<CreateUserDto, 'passwordHash'>