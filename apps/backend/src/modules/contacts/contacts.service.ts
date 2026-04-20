import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact, ContactDocument } from './contact.schema';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private readonly contactModel: Model<ContactDocument>) {}

  create(dto: CreateContactDto) {
    return this.contactModel.create(dto);
  }

  findAll() {
    return this.contactModel.find().sort({ isRead: 1, createdAt: -1 });
  }

  async markAsRead(id: string) {
    const contact = await this.contactModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async getUnreadCount() {
    const count = await this.contactModel.countDocuments({ isRead: false });
    return { count };
  }
}
