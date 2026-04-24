import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContactSubject } from '../../shared';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop()
  phone!: string;

  @Prop({ enum: ContactSubject })
  subject!: string;

  @Prop({ required: true })
  message!: string;

  @Prop({ default: false })
  isRead!: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
