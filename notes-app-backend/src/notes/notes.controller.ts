import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './schemas/note.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() note: Partial<Note>) {
    return this.notesService.create(note);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() note: Partial<Note>) {
    return this.notesService.update(id, note);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}
