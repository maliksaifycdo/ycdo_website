import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { DonationCampaign, DonationStatus, ICreateDonationDto, PaymentMethod } from '@ycdo/shared';

export class CreateDonationDto implements ICreateDonationDto {
  @IsString()
  donorName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsNumber()
  amount!: number;

  @IsEnum(DonationCampaign)
  campaign!: DonationCampaign;

  @IsEnum(PaymentMethod)
  method!: PaymentMethod;

  @IsOptional()
  @IsBoolean()
  isZakat?: boolean;
}

export class UpdateDonationStatusDto {
  @IsEnum(DonationStatus)
  status!: DonationStatus;
}
