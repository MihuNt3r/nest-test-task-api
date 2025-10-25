import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { INoteRepository } from '../domain/repositories/notes.repository'
import { Note } from 'src/domain/entities/note.entity'
import { UserId } from 'src/domain/value-objects/ids/user-id.vo'
import { NoteId } from 'src/domain/value-objects/ids/note-id.vo'

@Injectable()
export class NotesService {
  constructor(
    @Inject("INoteRepository")
    private readonly noteRepository: INoteRepository
  ) {}

  async createNote(userId: string, title: string, content: string): Promise<Note> {
    const note = Note.create(UserId.create(userId), title, content);
    await this.noteRepository.save(note);
    return note;
  }

  async getNoteById(id: string): Promise<Note> {
    const note = await this.noteRepository.findById(NoteId.create(id));
    if (!note) throw new NotFoundException("Note not found");
    return note;
  }

  async getNotesByUserId(userId: string): Promise<Note[]> {
    return await this.noteRepository.findByUserId(UserId.create(userId));
  }

  async updateNote(note: Note, title: string, content: string): Promise<void> {
    note.update(title, content);
    await this.noteRepository.save(note);
  }

  async deleteNote(note: Note): Promise<void> {
    await this.noteRepository.delete(note);
  }
}