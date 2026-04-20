import { IsString } from 'class-validator';
import { IUpdateSettingDto } from '@ycdo/shared';

export class UpdateSettingDto implements IUpdateSettingDto {
  @IsString()
  value!: string;
}
