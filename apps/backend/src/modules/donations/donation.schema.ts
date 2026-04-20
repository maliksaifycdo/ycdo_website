import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DonationCampaign, DonationStatus, PaymentMethod } from '@ycdo/shared';
import { HydratedDocument } from 'mongoose';

export type DonationDocument = HydratedDocument<Donation>;

@Schema({ timestamps: true })
export class Donation {
  @Prop({ required: true })
  donorName!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  phone!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop({ enum: DonationCampaign })
  campaign!: string;

  @Prop({ enum: PaymentMethod })
  method!: string;

  @Prop({ default: false })
  isZakat!: boolean;

  @Prop({ enum: DonationStatus, default: DonationStatus.PENDING })
  status!: string;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
