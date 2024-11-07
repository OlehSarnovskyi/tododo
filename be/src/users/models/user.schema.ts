import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { AbstractDocument } from '../../shared/abstract.schema'

@Schema({versionKey: false})
export class UserDocument extends AbstractDocument {
  @Prop({required: true})
  id: number
}

export const UserSchema = SchemaFactory.createForClass(UserDocument)
