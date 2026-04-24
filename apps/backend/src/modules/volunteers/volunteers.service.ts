import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VolunteerStatus } from '../../shared';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { Volunteer, VolunteerDocument } from './volunteer.schema';

@Injectable()
export class VolunteersService {
  constructor(
    @InjectModel(Volunteer.name) private readonly volunteerModel: Model<VolunteerDocument>,
  ) {}

  create(dto: CreateVolunteerDto) {
    return this.volunteerModel.create(dto);
  }

  findAll() {
    return this.volunteerModel.find().sort({ createdAt: -1 });
  }

  async updateStatus(id: string, status: VolunteerStatus) {
    const volunteer = await this.volunteerModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!volunteer) throw new NotFoundException('Volunteer not found');
    return volunteer;
  }

  async remove(id: string) {
    const volunteer = await this.volunteerModel.findByIdAndDelete(id);
    if (!volunteer) throw new NotFoundException('Volunteer not found');
    return { ok: true };
  }
}
