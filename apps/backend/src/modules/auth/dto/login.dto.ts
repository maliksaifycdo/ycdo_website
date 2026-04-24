import { IsEmail, IsString, MinLength } from 'class-validator';
import { ILoginDto } from '../../../shared';

export class LoginDto implements ILoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
