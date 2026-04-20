import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGalleryItemDto, UpdateGalleryItemDto } from './dto/create-gallery-item.dto';
import { GalleryItem, GalleryItemDocument } from './gallery-item.schema';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(GalleryItem.name)
    private readonly galleryModel: Model<GalleryItemDocument>,
  ) {}

  findAll(category?: string) {
    const filter = category ? { category } : {};
    return this.galleryModel.find(filter).sort({ date: -1 });
  }

  create(dto: CreateGalleryItemDto) {
    return this.galleryModel.create(dto);
  }

  async update(id: string, dto: UpdateGalleryItemDto) {
    const item = await this.galleryModel.findByIdAndUpdate(id, dto, { new: true });
    if (!item) throw new NotFoundException('Gallery item not found');
    return item;
  }

  async remove(id: string) {
    const item = await this.galleryModel.findByIdAndDelete(id);
    if (!item) throw new NotFoundException('Gallery item not found');
    return { message: 'Gallery item deleted' };
  }
}
