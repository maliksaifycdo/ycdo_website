export interface HospitalLocation {
  name: string;
  lat: number;
  lng: number;
  services: string[];
}

export interface HospitalCard {
  name: string;
  address: string;
  services: string[];
  timing: string;
  timingColor: string;
}

export const hospitals: HospitalLocation[] = [
  { name: 'Masoom Shah Road', lat: 30.1575, lng: 71.5249, services: ['OPD', 'Labs', 'Eye Care'] },
  { name: 'Surajkund Road', lat: 30.195, lng: 71.475, services: ['Emergency', 'Gynae'] },
  { name: 'Budhla Sant', lat: 30.21, lng: 71.51, services: ['Mobile Unit', 'TB Screening'] },
  { name: 'Hasanabad Gate No.2', lat: 30.18, lng: 71.49, services: ['Blood Bank', 'OPD'] },
  { name: 'Qasimpur Colony (HQ)', lat: 30.165, lng: 71.485, services: ['Dental', 'OPD', 'Emergency'] },
  { name: 'Delhi Gate', lat: 30.17, lng: 71.5, services: ['Emergency', 'OPD'] },
  { name: 'Basti Nagina Abad', lat: 30.14, lng: 71.47, services: ['Mother & Child'] },
];

export const hospitalCards: HospitalCard[] = [
  { name: 'Masoom Shah Rd Clinic', address: 'Masoom Shah Rd, Multan', services: ['OPD', 'Labs', 'Eye Care'], timing: '24/7 Open', timingColor: 'text-[#1A7A3C]' },
  { name: 'Surajkund Rd Hospital', address: 'Surajkund Rd, Multan', services: ['Emergency', 'Gynae'], timing: '09:00 - 17:00', timingColor: 'text-gray-600' },
  { name: 'Budhla Sant Center', address: 'Budhla Sant, Multan', services: ['Mobile Unit', 'TB Screening'], timing: '08:00 - 14:00', timingColor: 'text-gray-600' },
  { name: 'Hasanabad Gate No.2', address: 'Hasanabad Gate No.2, Multan', services: ['Blood Bank', 'OPD'], timing: '24/7 Open', timingColor: 'text-[#1A7A3C]' },
  { name: 'Qasimpur Colony', address: 'Qasimpur Colony, Multan', services: ['Dental', 'OPD'], timing: '09:00 - 20:00', timingColor: 'text-gray-600' },
  { name: 'Delhi Gate Unit', address: 'Delhi Gate, Multan', services: ['Emergency', 'OPD'], timing: '24/7 Open', timingColor: 'text-[#1A7A3C]' },
  { name: 'Basti Nagina Abad', address: 'Basti Nagina Abad, Multan', services: ['Mother & Child'], timing: '08:00 - 16:00', timingColor: 'text-gray-600' },
];
