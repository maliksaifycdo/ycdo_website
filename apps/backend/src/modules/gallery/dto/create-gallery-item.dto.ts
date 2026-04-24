import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { GalleryCategory, GalleryItemType, ICreateGalleryItemDto } from '../../../shared';

export class CreateGalleryItemDto implements ICreateGalleryItemDto {
  @IsString()
  url!: string;

  @IsString()
  caption!: string;

  @IsEnum(GalleryCategory)
  category!: GalleryCategory;

  @IsDateString()
  date!: string;

  @IsOptional()
  @IsString()
  eventTag?: string;

  @IsEnum(['image', 'video'])
  type!: GalleryItemType;
}

export class UpdateGalleryItemDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsEnum(GalleryCategory)
  category?: GalleryCategory;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  eventTag?: string;

  @IsOptional()
  @IsEnum(['image', 'video'])
  type?: GalleryItemType;
}
