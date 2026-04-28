import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class UpsertCmsPageDto {
  @ApiProperty({ example: 'Home' })
  @IsString()
  title!: string;

  @ApiProperty({ required: false, type: Object })
  @IsOptional()
  @IsObject()
  seo?: Record<string, unknown>;

  @ApiProperty({ type: [Object], required: false })
  @IsOptional()
  @IsArray()
  sections?: Array<Record<string, unknown>>;
}
