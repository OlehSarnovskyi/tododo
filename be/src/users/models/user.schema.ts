import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../shared/abstract.schema';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  first_name: string;

  @Prop()
  last_name?: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  language_code: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument)
