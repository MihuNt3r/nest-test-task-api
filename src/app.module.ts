import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { NotesService } from './services/notes/notes.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UsersService, NotesService],
})
export class AppModule {}
