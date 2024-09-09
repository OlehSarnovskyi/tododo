import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { AbstractDocument } from 'src/shared/abstract.schema'
import { TaskDocument } from '../modules/tasks/models/task.schema';

interface Task {
  text: string
  status: string
}

@Schema({versionKey: false})
export class DateDocument extends AbstractDocument {
  @Prop({ type: Date, required: true })
  date: Date

  @Prop({ type: [TaskDocument] })
  tasks: Task[]
}

export const DateSchema = SchemaFactory.createForClass(DateDocument)
