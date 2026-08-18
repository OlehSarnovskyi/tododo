import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {AbstractDocument} from "../../../../shared/abstract.schema";
import {StatusEnum} from "./status.enum";

@Schema({versionKey: false})
export class TaskDocument extends AbstractDocument {
  @Prop({ required: true })
  userId: number

  @Prop({ required: true })
  date: string

  /** Encrypted at rest — see CryptoService. Never store plaintext here. */
  @Prop({ required: true })
  text: string

  @Prop({ required: true, enum: StatusEnum, default: StatusEnum.TODO })
  status: StatusEnum

  @Prop({ required: true, default: 0 })
  order: number
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument)

// Every read is scoped to a user and a day, and rendered in manual order.
TaskSchema.index({ userId: 1, date: 1, order: 1 })
