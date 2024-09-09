import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { AbstractDocument } from 'src/shared/abstract.schema'

@Schema({versionKey: false})
export class TaskDocument extends AbstractDocument {
  @Prop({ required: true })
  text: string

  @Prop({ required: true })
  status: boolean
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument)
