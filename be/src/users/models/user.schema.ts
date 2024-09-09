import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { AbstractDocument } from '../../shared/abstract.schema'

@Schema({versionKey: false})
export class UserDocument extends AbstractDocument {
  @Prop({required: true})
  userId: string

  // @Prop({type: [{type: SchemaTypes.ObjectId, ref: 'DateDocument'}]})
  // dates?: Types.ObjectId[]

  // TODO: dates
}

export const UserSchema = SchemaFactory.createForClass(UserDocument)
