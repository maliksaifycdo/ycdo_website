import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VolunteerStatus } from '@ycdo/shared';
import { HydratedDocument } from 'mongoose';

export type VolunteerDocument = HydratedDocument<Volunteer>;

@Schema({ timestamps: true })
export class Volunteer {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  phone!: string;

  @Prop([String])
  skills!: string[];

  @Prop()
  availability!: string;

  @Prop({ enum: VolunteerStatus, default: VolunteerStatus.PENDING })
  status!: string;
}

export const VolunteerSchema = SchemaFactory.createForClass(Volunteer);
