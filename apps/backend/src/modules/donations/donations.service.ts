import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DonationStatus } from '../../shared';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation, DonationDocument } from './donation.schema';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name) private readonly donationModel: Model<DonationDocument>,
  ) {}

  create(dto: CreateDonationDto) {
    return this.donationModel.create(dto);
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.donationModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      this.donationModel.countDocuments(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStats() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [overall, byCampaign, thisMonth] = await Promise.all([
      this.donationModel.aggregate([
        { $match: { status: DonationStatus.COMPLETED } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
      this.donationModel.aggregate([
        { $match: { status: DonationStatus.COMPLETED } },
        { $group: { _id: '$campaign', total: { $sum: '$amount' } } },
      ]),
      this.donationModel.aggregate([
        { $match: { status: DonationStatus.COMPLETED, createdAt: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    return {
      total: overall[0]?.total ?? 0,
      count: overall[0]?.count ?? 0,
      byCampaign,
      thisMonth: thisMonth[0]?.total ?? 0,
    };
  }

  async updateStatus(id: string, status: DonationStatus) {
    const donation = await this.donationModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!donation) throw new NotFoundException('Donation not found');
    return donation;
  }
}
