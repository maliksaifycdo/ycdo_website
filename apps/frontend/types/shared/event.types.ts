export interface IEvent {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  registrationLink?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ICreateEventDto {
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  registrationLink?: string;
}
