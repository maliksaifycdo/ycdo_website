import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CmsPage, CmsPageDocument } from './cms-page.schema';
import { DEFAULT_CMS_PAGES } from './cms.defaults';
import { UpsertCmsPageDto } from './dto/upsert-cms-page.dto';

@Injectable()
export class CmsService implements OnModuleInit {
  constructor(@InjectModel(CmsPage.name) private readonly cmsPageModel: Model<CmsPageDocument>) {}

  async onModuleInit() {
    const totalPages = await this.cmsPageModel.countDocuments();
    if (totalPages > 0) return;

    await this.cmsPageModel.insertMany(
      DEFAULT_CMS_PAGES.map((entry) => ({
        slug: entry.slug,
        ...entry.data,
      })),
    );
  }

  findAll() {
    return this.cmsPageModel.find().sort({ slug: 1 });
  }

  async findBySlug(slug: string) {
    const page = await this.cmsPageModel.findOne({ slug });
    if (!page) {
      throw new NotFoundException(`CMS page not found for slug "${slug}"`);
    }
    return page;
  }

  async upsertBySlug(slug: string, dto: UpsertCmsPageDto) {
    return this.cmsPageModel.findOneAndUpdate(
      { slug },
      { slug, ...dto },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
}
