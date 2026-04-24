export interface ISetting {
  _id: string;
  key: string;
  value: string;
  label: string;
  group: string;
}

export interface IUpdateSettingDto {
  value: string;
}
