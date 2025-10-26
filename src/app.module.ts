import { Module } from '@nestjs/common';
import AppServicesModule from 'src/services/app-services.module'
import { UsersController } from 'src/controllers/users.controller'
import { NotesController } from 'src/controllers/notes.controller'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './controllers/auth.controller'

@Module({
  imports: [
    AppServicesModule,
    ConfigModule.forRoot({ isGlobal: true }),

  ],
  controllers: [UsersController, NotesController, AuthController],
  providers: [],
})
export class AppModule {}
