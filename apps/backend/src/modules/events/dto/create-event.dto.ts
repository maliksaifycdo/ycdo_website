import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ICreateEventDto } from '@ycdo/shared';

export class CreateEventDto implements ICreateEventDto {
  @IsString()
  title!: string;

  @IsDateString()
  date!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsString()
  location!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  registrationLink?: string;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  registrationLink?: string;
}
