import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  date!: Date;

  @Prop()
  endDate!: Date;

  @Prop({ required: true })
  location!: string;

  @Prop()
  description!: string;

  @Prop()
  registrationLink!: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
