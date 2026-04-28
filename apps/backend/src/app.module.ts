import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HospitalsModule } from './modules/hospitals/hospitals.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { NewsModule } from './modules/news/news.module';
import { EventsModule } from './modules/events/events.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { DonationsModule } from './modules/donations/donations.module';
import { VolunteersModule } from './modules/volunteers/volunteers.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { UploadModule } from './modules/upload/upload.module';
import { SettingsModule } from './modules/settings/settings.module';
import { CmsModule } from './modules/cms/cms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Explicitly load env from backend folder first, then repo root (monorepo-friendly).
      envFilePath: [
        path.resolve(__dirname, '..', '.env'),
        path.resolve(process.cwd(), '.env'),
        path.resolve(process.cwd(), '..', '..', '.env'),
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error(
            'MONGODB_URI is not set. Add it to your environment to start the backend API.',
          );
        }

        return {
          uri,
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
          socketTimeoutMS: 10000,
          connectionFactory: (connection) => {
            connection.on('connected', () => console.log('✅ MongoDB connected'));
            connection.on('error', (err) => console.error('❌ MongoDB error:', err));
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    HospitalsModule,
    ProjectsModule,
    NewsModule,
    EventsModule,
    GalleryModule,
    DonationsModule,
    VolunteersModule,
    AppointmentsModule,
    ContactsModule,
    UploadModule,
    SettingsModule,
    CmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
