import { NoteId } from '../value-objects/ids/note-id.vo';
import { UserId } from '../value-objects/ids/user-id.vo';

export class Note {
  private readonly _id: NoteId;
  private readonly _userId: UserId;
  private _title: string;
  private _content: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(
    id: NoteId,
    userId: UserId,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = id;
    this._userId = userId;
    this._title = title;
    this._content = content;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  /**
   * Factory method for creating a new Note
   */
  static create(userId: UserId, title: string, content: string): Note {
    const noteId = NoteId.create();
    const now = new Date();

    return new Note(noteId, userId, title, content, now, now);
  }

  get id(): NoteId {
    return this._id;
  }

  get userId(): UserId {
    return this._userId;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  update(title: string, content: string): void {
    this._title = title;
    this._content = content;
    this._updatedAt = new Date();
  }
}