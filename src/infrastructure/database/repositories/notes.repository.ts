import { Inject, Injectable, NotImplementedException } from '@nestjs/common'
import * as schema from "../schema";
import { INoteRepository } from 'src/domain/repositories/notes.repository'
import { Note } from 'src/domain/entities/note.entity'
import { NoteId } from 'src/domain/value-objects/ids/note-id.vo'
import { UserId } from 'src/domain/value-objects/ids/user-id.vo'
import { DrizzleAsyncProvider } from '../provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

@Injectable()
export class NoteRepository implements INoteRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) { }

  async save(note: Note): Promise<void> {
    throw new NotImplementedException('Not implemented');
  }

  async findById(id: NoteId): Promise<Note | null> {
    throw new NotImplementedException('Not implemented');
  }

  async findByUserId(userId: UserId): Promise<Note[]> {
    throw new NotImplementedException('Not implemented');
  }

  async delete(note: Note): Promise<void> {
    throw new NotImplementedException('Not implemented');
  }
}
