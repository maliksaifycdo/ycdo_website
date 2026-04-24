import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentStatus } from '../../shared';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hospital' })
  hospitalId!: Types.ObjectId;

  @Prop()
  department!: string;

  @Prop({ required: true })
  preferredDate!: Date;

  @Prop({ required: true })
  patientName!: string;

  @Prop({ required: true })
  phone!: string;

  @Prop({ enum: AppointmentStatus, default: AppointmentStatus.PENDING })
  status!: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
