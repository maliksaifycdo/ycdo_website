import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ContactSubject, ICreateContactDto } from '../../../shared';

export class CreateContactDto implements ICreateContactDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEnum(ContactSubject)
  subject!: ContactSubject;

  @IsString()
  message!: string;
}
