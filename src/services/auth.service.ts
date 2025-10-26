import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Inject,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../infrastructure/database/repositories/users.repository';
import { Email } from '../domain/value-objects/users/email.vo';
import { Username } from '../domain/value-objects/users/username.vo';
import { Name } from '../domain/value-objects/users/name.vo';
import { User } from '../domain/entities/user.entity';
import { Role } from '../domain/value-objects/roles/role.vo'

@Injectable()
export class AuthService {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    username: string,
    name: string,
    password: string,
    role: Role
  ): Promise<void> {
    const existing = await this.userRepository.findByEmail(new Email(email));
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = User.create(
      new Email(email),
      passwordHash,
      new Username(username),
      new Name(name),
      role
    );

    await this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByEmail(new Email(email));

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username.toString(),
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async validateToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
