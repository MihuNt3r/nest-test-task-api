import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { notes } from "../schema";
import { INoteRepository } from 'src/domain/repositories/notes.repository'
import { Note } from 'src/domain/entities/note.entity'
import { NoteId } from 'src/domain/value-objects/ids/note-id.vo'
import { UserId } from 'src/domain/value-objects/ids/user-id.vo'

@Injectable()
export class NoteRepositoryImpl implements INoteRepository {
  constructor(@Inject("DRIZZLE") private db: any) {}

  async save(note: Note): Promise<void> {
    const existing = await this.findById(note.id);

    if (existing) {
      await this.db
        .update(notes)
        .set({
          title: note.title,
          content: note.content,
          updatedAt: new Date(),
        })
        .where(eq(notes.id, note.id.getValue()));
      return;
    }

    await this.db.insert(notes).values({
      id: note.id.getValue(),
      userId: note.userId.getValue(),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    });
  }

  async findById(id: NoteId): Promise<Note | null> {
    const result = await this.db.query.notes.findFirst({
      where: eq(notes.id, id.getValue()),
    });

    if (!result) return null;

    return Note.create(
      UserId.create(result.userId),
      result.title,
      result.content,
    );
  }

  async findByUserId(userId: UserId): Promise<Note[]> {
    const results = await this.db.query.notes.findMany({
      where: eq(notes.userId, userId.getValue()),
    });

    return results.map(
      (r) =>
        Note.create(
          UserId.create(r.userId),
          r.title,
          r.content,
        ),
    );
  }

  async delete(note: Note): Promise<void> {
    await this.db.delete(notes).where(eq(notes.id, note.id.getValue()));
  }
}
