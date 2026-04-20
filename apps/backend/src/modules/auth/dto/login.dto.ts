import { IsEmail, IsString, MinLength } from 'class-validator';
import { ILoginDto } from '@ycdo/shared';

export class LoginDto implements ILoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
