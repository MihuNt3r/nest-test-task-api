import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotesService } from 'src/services/notes.service'
import { CreateNoteDto } from 'src/shared/dtos/notes/create-note'
import { Note } from 'src/domain/entities/note.entity'
import { UpdateNoteDto } from 'src/shared/dtos/notes/update-note'

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(@Body() dto: CreateNoteDto): Promise<Note> {
    return this.notesService.createNote(dto.userId, dto.title, dto.content);
  }

  @Get(':id')
  async getNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.getNoteById(id);
  }

  @Get('user/:userId')
  async getNotesByUser(@Param('userId') userId: string): Promise<Note[]> {
    return this.notesService.getNotesByUserId(userId);
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() dto: UpdateNoteDto): Promise<void> {
    const note = await this.notesService.getNoteById(id);
    await this.notesService.updateNote(note, dto.title, dto.content);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<void> {
    const note = await this.notesService.getNoteById(id);
    await this.notesService.deleteNote(note);
  }
}

