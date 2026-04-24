import { IsArray, IsEmail, IsEnum, IsString } from 'class-validator';
import { ICreateVolunteerDto, VolunteerStatus } from '../../../shared';

export class CreateVolunteerDto implements ICreateVolunteerDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  @IsString()
  availability!: string;
}

export class UpdateVolunteerStatusDto {
  @IsEnum(VolunteerStatus)
  status!: VolunteerStatus;
}
