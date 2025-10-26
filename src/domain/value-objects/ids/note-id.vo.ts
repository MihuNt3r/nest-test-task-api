import { EntityId } from './abstract/entity-id.vo';

export class NoteId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value?: string): NoteId {
    return new NoteId(value || EntityId.generateId());
  }

  static fromString(value: string): NoteId {
    return new NoteId(value);
  }
}