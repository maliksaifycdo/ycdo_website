import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './setting.schema';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(@InjectModel(Setting.name) private readonly settingModel: Model<SettingDocument>) {}

  async onModuleInit() {
    const count = await this.settingModel.countDocuments();
    if (count > 0) return;

    await this.settingModel.insertMany([
      { key: 'contact_phone', value: '03002022008', label: 'Phone Number', group: 'contact' },
      { key: 'contact_email', value: 'info@ycdo.org.pk', label: 'Email', group: 'contact' },
      { key: 'contact_address', value: 'Qasimpur Colony, Multan, Pakistan', label: 'Address', group: 'contact' },
      { key: 'bank_account_title', value: 'Youth Community Development Organization', label: 'Account Title', group: 'bank' },
      { key: 'bank_account_number', value: '0000-0000-0000', label: 'Account Number', group: 'bank' },
      { key: 'bank_name', value: 'Habib Bank Limited', label: 'Bank Name', group: 'bank' },
      { key: 'bank_iban', value: 'PK00HABB0000000000000000', label: 'IBAN', group: 'bank' },
      { key: 'facebook_url', value: 'https://facebook.com/YCDOPAKISTAN', label: 'Facebook', group: 'social' },
      { key: 'twitter_url', value: 'https://x.com/ycdoofficial', label: 'Twitter/X', group: 'social' },
    ]);
  }

  findAll() {
    return this.settingModel.find().sort({ group: 1, key: 1 });
  }

  findByKey(key: string) {
    return this.settingModel.findOne({ key });
  }

  findByGroup(group: string) {
    return this.settingModel.find({ group }).sort({ key: 1 });
  }

  upsert(key: string, value: string) {
    return this.settingModel.findOneAndUpdate({ key }, { value }, { new: true, upsert: true });
  }
}
