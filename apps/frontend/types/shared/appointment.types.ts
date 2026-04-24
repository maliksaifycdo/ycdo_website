export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export interface IAppointment {
  _id: string;
  hospitalId: string;
  hospitalName?: string;
  department: string;
  preferredDate: string;
  patientName: string;
  phone: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface ICreateAppointmentDto {
  hospitalId: string;
  department: string;
  preferredDate: string;
  patientName: string;
  phone: string;
}
