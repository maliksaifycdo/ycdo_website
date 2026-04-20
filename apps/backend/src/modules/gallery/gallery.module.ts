import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryItem, GalleryItemSchema } from './gallery-item.schema';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: GalleryItem.name, schema: GalleryItemSchema }])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
