import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {AbstractDocument} from "../../../../shared/abstract.schema";
import {StatusEnum} from "./status.enum";
@Schema({versionKey: false})
export class TaskDocument extends AbstractDocument {
  @Prop({ required: true })
  userId: number

  @Prop({ required: true })
  date: string

  @Prop({ required: true })
  text: string

  @Prop({ required: true, default: StatusEnum.ACTIVE })
  status: boolean
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument)
