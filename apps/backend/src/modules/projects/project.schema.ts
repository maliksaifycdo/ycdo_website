import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProjectCategory } from '../../shared';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ enum: ProjectCategory, required: true })
  category!: string;

  @Prop()
  impactStat!: string;

  @Prop()
  location!: string;

  @Prop([String])
  images!: string[];

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: 0 })
  order!: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ isActive: 1, order: 1 });
