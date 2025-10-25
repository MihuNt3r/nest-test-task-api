import { Module } from "@nestjs/common";
import { UsersService } from './users.service'
import { NotesService } from './notes.service'
import { UserRepository } from '../infrastructure/database/repositories/users.repository'
import { NoteRepository } from '../infrastructure/database/repositories/notes.repository'
import { DrizzleModule } from '../infrastructure/database/module'

@Module({
  imports: [DrizzleModule],
  providers: [
    UsersService,
    NotesService,
    { provide: "IUserRepository", useClass: UserRepository },
    { provide: "INoteRepository", useClass: NoteRepository },
  ],
  exports: [UsersService, NotesService],
})
export default class AppServicesModule {}