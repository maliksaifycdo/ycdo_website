import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type CmsPageDocument = HydratedDocument<CmsPage>;

@Schema({ timestamps: true })
export class CmsPage {
  @Prop({ required: true, unique: true, trim: true })
  slug!: string;

  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ type: SchemaTypes.Mixed, default: {} })
  seo!: Record<string, unknown>;

  @Prop({ type: [SchemaTypes.Mixed], default: [] })
  sections!: Array<Record<string, unknown>>;
}

export const CmsPageSchema = SchemaFactory.createForClass(CmsPage);
// slug already has `unique: true` above; avoid duplicate index warnings.
