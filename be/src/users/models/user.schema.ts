import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { AbstractDocument } from '../../shared/abstract.schema'
import { DateDocument } from '../modules/dates/models/date.schema'

@Schema({versionKey: false})
export class UserDocument extends AbstractDocument {
  @Prop({required: true})
  userId: string

  @Prop({type: [{type: DateDocument}]})
  dates?: string[]
}

export const UserSchema = SchemaFactory.createForClass(UserDocument)
