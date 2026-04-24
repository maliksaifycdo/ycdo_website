export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
