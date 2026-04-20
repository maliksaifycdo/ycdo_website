import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '@ycdo/shared';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
