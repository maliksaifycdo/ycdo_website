export enum VolunteerStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface IVolunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  status: VolunteerStatus;
  createdAt: string;
}

export interface ICreateVolunteerDto {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
}
