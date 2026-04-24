import { IsString } from 'class-validator';
import { IUpdateSettingDto } from '../../../shared';

export class UpdateSettingDto implements IUpdateSettingDto {
  @IsString()
  value!: string;
}
