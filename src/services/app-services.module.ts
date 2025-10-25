import { Module } from "@nestjs/common";
import { UsersService } from './users.service'
import { NotesService } from './notes.service'
import { UserRepository } from '../infrastructure/database/repositories/users.repository'

@Module({
  providers: [
    UsersService,
    { provide: "IUserRepository", useClass: UserRepository },
    NotesService,
    { provide: "INoteRepository", useClass: NotesService },
  ],
  exports: [UsersService, NotesService],
})
export default class AppServicesModule {}