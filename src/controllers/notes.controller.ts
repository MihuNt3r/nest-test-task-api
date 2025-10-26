import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotesService } from 'src/services/notes.service'
import { CreateNoteDto } from 'src/shared/dtos/notes/create-note'
import { Note } from 'src/domain/entities/note.entity'
import { UpdateNoteDto } from 'src/shared/dtos/notes/update-note'
import { Roles } from '../decorators/roles.decorator'
import { Role } from '../domain/value-objects/roles/role.vo'

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  async createNote(@Body() dto: CreateNoteDto): Promise<Note> {
    return this.notesService.createNote(dto.userId, dto.title, dto.content);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  async getNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.getNoteById(id);
  }

  @Get('user/:userId')
  @Roles(Role.ADMIN, Role.USER)
  async getNotesByUser(@Param('userId') userId: string): Promise<Note[]> {
    return this.notesService.getNotesByUserId(userId);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.USER)
  async updateNote(@Param('id') id: string, @Body() dto: UpdateNoteDto): Promise<void> {
    const note = await this.notesService.getNoteById(id);
    await this.notesService.updateNote(note, dto.title, dto.content);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  async deleteNote(@Param('id') id: string): Promise<void> {
    const note = await this.notesService.getNoteById(id);
    await this.notesService.deleteNote(note);
  }
}

