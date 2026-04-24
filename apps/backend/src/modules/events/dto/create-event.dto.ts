import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ICreateEventDto } from '../../../shared';

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

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
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

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
