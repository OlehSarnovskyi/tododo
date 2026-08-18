import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../shared/abstract.schema';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  /** Telegram user id — the lookup key, so it stays in the clear. */
  @Prop({ required: true, unique: true, index: true })
  id: number;

  /** Encrypted at rest — see CryptoService. */
  @Prop({ required: true })
  first_name: string;

  /** Encrypted at rest — see CryptoService. */
  @Prop()
  last_name?: string;

  /** Encrypted at rest — see CryptoService. */
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  language_code: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument)
