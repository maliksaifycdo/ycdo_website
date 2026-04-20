import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Donation, DonationSchema } from './donation.schema';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema }])],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
