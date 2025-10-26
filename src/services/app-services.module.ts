import { Module } from "@nestjs/common";
import { UsersService } from './users.service'
import { NotesService } from './notes.service'
import { UserRepository } from '../infrastructure/database/repositories/users.repository'
import { NoteRepository } from '../infrastructure/database/repositories/notes.repository'
import { DrizzleModule } from '../infrastructure/database/module'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_EXPIRATION', '15m'),
        },
      }),
    }),
    DrizzleModule
  ],
  providers: [
    UsersService,
    NotesService,
    AuthService,
    { provide: "IUserRepository", useClass: UserRepository },
    { provide: "INoteRepository", useClass: NoteRepository },
  ],
  exports: [UsersService, NotesService, AuthService],
})
export default class AppServicesModule {}