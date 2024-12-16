import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(note: Partial<Note>): Promise<Note> {
    const newNote = new this.noteModel(note);
    return newNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().sort({ createdAt: -1 }).exec();
  }

  async update(id: string, note: Partial<Note>): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(id, note, { new: true }).exec();
  }

  async delete(id: string): Promise<Note> {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
