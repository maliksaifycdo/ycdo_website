export interface IHospitalCoordinates {
  lat: number;
  lng: number;
}

export interface IHospital {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  services: string[];
  timings: string;
  coordinates: IHospitalCoordinates;
  photos: string[];
  isActive: boolean;
  createdAt: string;
}

export interface ICreateHospitalDto {
  name: string;
  address: string;
  city?: string;
  phone: string;
  services: string[];
  timings: string;
  coordinates: IHospitalCoordinates;
}
