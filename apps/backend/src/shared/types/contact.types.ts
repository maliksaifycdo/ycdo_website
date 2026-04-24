export enum ContactSubject {
  GENERAL = 'general',
  HEALTHCARE = 'healthcare',
  DONATION = 'donation',
  VOLUNTEER = 'volunteer',
  MEDIA = 'media',
}

export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ICreateContactDto {
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
}
