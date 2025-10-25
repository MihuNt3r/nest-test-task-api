import { Module } from '@nestjs/common';
import AppServicesModule from 'src/services/app-services.module'
import { UsersController } from 'src/controllers/users.controller'
import { NotesController } from 'src/controllers/notes.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    AppServicesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [UsersController, NotesController],
  providers: [],
})
export class AppModule {}
