import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  passwordHash: string;

  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  role: string;
}