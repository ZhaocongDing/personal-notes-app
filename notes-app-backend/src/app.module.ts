import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';

const MONGODB_URI = process.env.MONGODB_URI;

console.log(process.env.MONGO_URI);
@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), NotesModule],
})
export class AppModule {}
