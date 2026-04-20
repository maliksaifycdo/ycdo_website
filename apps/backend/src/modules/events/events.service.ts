import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto, UpdateEventDto } from './dto/create-event.dto';
import { Event, EventDocument } from './event.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private readonly eventModel: Model<EventDocument>) {}

  findAll() {
    return this.eventModel.find({ isActive: true }).sort({ date: 1 });
  }

  findUpcoming() {
    return this.eventModel.find({ date: { $gte: new Date() } }).sort({ date: 1 });
  }

  async findOne(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  create(dto: CreateEventDto) {
    return this.eventModel.create(dto);
  }

  async update(id: string, dto: UpdateEventDto) {
    const event = await this.eventModel.findByIdAndUpdate(id, dto, { new: true });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async remove(id: string) {
    const event = await this.eventModel.findByIdAndDelete(id);
    if (!event) throw new NotFoundException('Event not found');
    return { message: 'Event deleted' };
  }
}
