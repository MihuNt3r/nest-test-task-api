import { Module } from '@nestjs/common';
import AppServicesModule from 'src/services/app-services.module'
import { UsersController } from 'src/controllers/users.controller'
import { NotesController } from 'src/controllers/notes.controller'

@Module({
  imports: [AppServicesModule],
  controllers: [UsersController, NotesController],
  providers: [],
})
export class AppModule {}
