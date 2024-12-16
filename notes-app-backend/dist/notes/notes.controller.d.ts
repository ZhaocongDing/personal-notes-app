import { NotesService } from './notes.service';
import { Note } from './schemas/note.schema';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(note: Partial<Note>): Promise<Note>;
    findAll(): Promise<Note[]>;
    update(id: string, note: Partial<Note>): Promise<Note>;
    delete(id: string): Promise<Note>;
}
