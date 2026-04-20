import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/create-hospital.dto';
import { Hospital, HospitalDocument } from './hospital.schema';

@Injectable()
export class HospitalsService implements OnModuleInit {
  constructor(
    @InjectModel(Hospital.name) private readonly hospitalModel: Model<HospitalDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.hospitalModel.countDocuments();
    if (count > 0) return;

    await this.hospitalModel.insertMany([
      {
        name: 'YCDO Hospital & Diagnostic Center',
        address: 'Masoom Shah Road, Multan',
        city: 'Multan',
        phone: '03002022008',
        coordinates: { lat: 30.1575, lng: 71.5249 },
        services: ['OPD', 'Laboratory', 'Emergency'],
        timings: 'Mon-Sat: 8AM-8PM',
      },
      {
        name: 'YCDO Hospital & Diagnostic Center',
        address: 'Surajkund Road, Multan',
        city: 'Multan',
        phone: '03002022008',
        coordinates: { lat: 30.195, lng: 71.475 },
        services: ['OPD', 'Blood Bank', 'Laboratory'],
        timings: 'Mon-Sat: 8AM-8PM',
      },
      {
        name: 'YCDO Hospital & Diagnostic Center',
        address: 'Budhla Sant, Multan',
        city: 'Multan',
        phone: '03002022008',
        coordinates: { lat: 30.21, lng: 71.51 },
        services: ['OPD', 'Free TB Screening'],
        timings: 'Mon-Sat: 9AM-5PM',
      },
      {
        name: 'YCDO Eye Hospital & Diagnostic Center',
        address: 'Hasanabad Gate No.2, Multan',
        city: 'Multan',
        phone: '03002022008',
        coordinates: { lat: 30.18, lng: 71.49 },
        services: ['Eye Care', 'Surgery', 'OPD'],
        timings: 'Mon-Sat: 9AM-5PM',
      },
      {
        name: 'YCDO Hospital & Diagnostic Center (HQ)',
        address: 'Qasimpur Colony, Multan',
        city: 'Multan',
        phone: '03002022008',
        coordinates: { lat: 30.165, lng: 71.485 },
        services: ['OPD', 'Admin', 'Emergency', 'Laboratory'],
        timings: 'Mon-Sun: 8AM-10PM',
      },
      {
        name: 'YCDO Health Care Center',
        address: 'Delhi Gate, Multan',
        city: 'Multan',
        phone: '03002022008',
        coordinates: { lat: 30.17, lng: 71.5 },
        services: ['OPD', 'Basic Care'],
        timings: 'Mon-Sat: 9AM-5PM',
      },
      {
        name: 'YCDO Health Care Center',
        address: 'Basti Nagina Abad, Multan',
        city: 'Multan',
        phone: '03002022008',
        coordinates: { lat: 30.14, lng: 71.47 },
        services: ['OPD', 'Water Filtration'],
        timings: 'Mon-Sat: 9AM-3PM',
      },
    ]);
  }

  findAll(city?: string) {
    const filter = city ? { city } : {};
    return this.hospitalModel.find(filter).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const hospital = await this.hospitalModel.findById(id);
    if (!hospital) throw new NotFoundException('Hospital not found');
    return hospital;
  }

  create(dto: CreateHospitalDto) {
    return this.hospitalModel.create(dto);
  }

  async update(id: string, dto: UpdateHospitalDto) {
    const hospital = await this.hospitalModel.findByIdAndUpdate(id, dto, { new: true });
    if (!hospital) throw new NotFoundException('Hospital not found');
    return hospital;
  }

  async remove(id: string) {
    const hospital = await this.hospitalModel.findByIdAndDelete(id);
    if (!hospital) throw new NotFoundException('Hospital not found');
    return { message: 'Hospital deleted' };
  }
}
