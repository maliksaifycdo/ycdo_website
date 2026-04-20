export enum DonationCampaign {
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  FOOD = 'food',
  WATER = 'water',
}

export enum PaymentMethod {
  JAZZCASH = 'jazzcash',
  EASYPAISA = 'easypaisa',
  BANK_TRANSFER = 'bank_transfer',
}

export enum DonationStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface IDonation {
  _id: string;
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  campaign: DonationCampaign;
  method: PaymentMethod;
  isZakat: boolean;
  status: DonationStatus;
  createdAt: string;
}

export interface ICreateDonationDto {
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  campaign: DonationCampaign;
  method: PaymentMethod;
  isZakat?: boolean;
}
