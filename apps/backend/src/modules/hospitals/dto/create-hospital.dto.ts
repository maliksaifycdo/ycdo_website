import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ICreateHospitalDto, IHospitalCoordinates } from '@ycdo/shared';

class HospitalCoordinatesDto implements IHospitalCoordinates {
  @IsNumber()
  lat!: number;

  @IsNumber()
  lng!: number;
}

export class CreateHospitalDto implements ICreateHospitalDto {
  @IsString()
  name!: string;

  @IsString()
  address!: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  phone!: string;

  @IsArray()
  @IsString({ each: true })
  services!: string[];

  @IsString()
  timings!: string;

  @ValidateNested()
  @Type(() => HospitalCoordinatesDto)
  coordinates!: HospitalCoordinatesDto;
}

export class UpdateHospitalDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  services?: string[];

  @IsOptional()
  @IsString()
  timings?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HospitalCoordinatesDto)
  coordinates?: HospitalCoordinatesDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @IsOptional()
  isActive?: boolean;
}
