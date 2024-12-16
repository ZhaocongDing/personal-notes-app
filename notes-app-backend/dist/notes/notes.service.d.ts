import { Model } from 'mongoose';
import { Note } from './schemas/note.schema';
export declare class NotesService {
    private noteModel;
    constructor(noteModel: Model<Note>);
    create(note: Partial<Note>): Promise<Note>;
    findAll(): Promise<Note[]>;
    update(id: string, note: Partial<Note>): Promise<Note>;
    delete(id: string): Promise<Note>;
}
