import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GalleryCategory } from '@ycdo/shared';
import { HydratedDocument } from 'mongoose';

export type GalleryItemDocument = HydratedDocument<GalleryItem>;

@Schema({ timestamps: true })
export class GalleryItem {
  @Prop({ required: true })
  url!: string;

  @Prop()
  caption!: string;

  @Prop({ enum: GalleryCategory })
  category!: string;

  @Prop({ default: Date.now })
  date!: Date;

  @Prop()
  eventTag!: string;

  @Prop({ enum: ['image', 'video'], default: 'image' })
  type!: string;
}

export const GalleryItemSchema = SchemaFactory.createForClass(GalleryItem);
