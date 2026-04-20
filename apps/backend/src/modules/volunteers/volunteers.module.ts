import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Volunteer, VolunteerSchema } from './volunteer.schema';
import { VolunteersController } from './volunteers.controller';
import { VolunteersService } from './volunteers.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Volunteer.name, schema: VolunteerSchema }])],
  controllers: [VolunteersController],
  providers: [VolunteersService],
})
export class VolunteersModule {}
