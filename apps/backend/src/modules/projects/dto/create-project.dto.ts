import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { ICreateProjectDto, ProjectCategory } from '@ycdo/shared';

export class CreateProjectDto implements ICreateProjectDto {
  @IsString()
  title!: string;

  @IsEnum(ProjectCategory)
  category!: ProjectCategory;

  @IsString()
  description!: string;

  @IsString()
  impactStat!: string;

  @IsString()
  location!: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(ProjectCategory)
  category?: ProjectCategory;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  impactStat?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  isActive?: boolean;
}
