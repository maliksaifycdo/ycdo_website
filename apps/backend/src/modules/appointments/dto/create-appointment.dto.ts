import { IsDateString, IsEnum, IsString } from 'class-validator';
import { AppointmentStatus, ICreateAppointmentDto } from '@ycdo/shared';

export class CreateAppointmentDto implements ICreateAppointmentDto {
  @IsString()
  hospitalId!: string;

  @IsString()
  department!: string;

  @IsDateString()
  preferredDate!: string;

  @IsString()
  patientName!: string;

  @IsString()
  phone!: string;
}

export class UpdateAppointmentStatusDto {
  @IsEnum(AppointmentStatus)
  status!: AppointmentStatus;
}
