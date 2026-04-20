import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsArticleDocument = HydratedDocument<NewsArticle>;

@Schema({ timestamps: true })
export class NewsArticle {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true, unique: true })
  slug!: string;

  @Prop({ required: true })
  body!: string;

  @Prop()
  thumbnail!: string;

  @Prop({ default: 'YCDO Team' })
  author!: string;

  @Prop()
  category!: string;

  @Prop([String])
  tags!: string[];

  @Prop({ default: Date.now })
  publishedAt!: Date;

  @Prop({ default: true })
  isPublished!: boolean;
}

export const NewsArticleSchema = SchemaFactory.createForClass(NewsArticle);
