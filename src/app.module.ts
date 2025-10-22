import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './services/users/users.service';
import { NotesService } from './services/notes/notes.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UsersService, NotesService],
})
export class AppModule {}
