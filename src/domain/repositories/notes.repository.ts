import { Note } from "../entities/note.entity";
import { NoteId } from "../value-objects/ids/note-id.vo";
import { UserId } from "../value-objects/ids/user-id.vo";

export interface INoteRepository {
  save(note: Note): Promise<void>;
  findById(id: NoteId): Promise<Note | null>;
  findByUserId(userId: UserId): Promise<Note[]>;
  delete(note: Note): Promise<void>;
}