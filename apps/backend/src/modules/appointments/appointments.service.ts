import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentStatus } from '@ycdo/shared';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment, AppointmentDocument } from './appointment.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  create(dto: CreateAppointmentDto) {
    return this.appointmentModel.create(dto);
  }

  findAll() {
    return this.appointmentModel
      .find()
      .populate('hospitalId', 'name')
      .sort({ createdAt: -1 });
  }

  async updateStatus(id: string, status: AppointmentStatus) {
    const appointment = await this.appointmentModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('hospitalId', 'name');
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }
}
