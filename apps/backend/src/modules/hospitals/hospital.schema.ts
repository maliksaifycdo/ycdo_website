import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HospitalDocument = HydratedDocument<Hospital>;

@Schema({ timestamps: true })
export class Hospital {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ default: 'Multan' })
  city!: string;

  @Prop()
  phone!: string;

  @Prop([String])
  services!: string[];

  @Prop()
  timings!: string;

  @Prop({
    type: { lat: Number, lng: Number },
    default: { lat: 30.1575, lng: 71.5249 },
  })
  coordinates!: { lat: number; lng: number };

  @Prop([String])
  photos!: string[];

  @Prop({ default: true })
  isActive!: boolean;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
