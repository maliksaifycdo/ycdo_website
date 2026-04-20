import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNewsDto, UpdateNewsDto } from './dto/create-news.dto';
import { NewsArticle, NewsArticleDocument } from './news-article.schema';

@Injectable()
export class NewsService implements OnModuleInit {
  constructor(
    @InjectModel(NewsArticle.name)
    private readonly newsModel: Model<NewsArticleDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.newsModel.countDocuments();
    if (count > 0) return;

    await this.newsModel.insertMany([
      {
        title: 'YCDO Launches Free Medical Camp',
        slug: 'ycdo-launches-free-medical-camp',
        body: 'YCDO organized a free medical camp in Multan for underserved families.',
        category: 'healthcare',
        tags: ['medical', 'camp'],
        isPublished: true,
      },
      {
        title: 'Scholarship Distribution Ceremony Held',
        slug: 'scholarship-distribution-ceremony-held',
        body: 'Scholarships were distributed to deserving students under YCDO education program.',
        category: 'education',
        tags: ['scholarship', 'students'],
        isPublished: true,
      },
      {
        title: 'New Water Filtration Plant Inaugurated',
        slug: 'new-water-filtration-plant-inaugurated',
        body: 'A new RO plant was inaugurated to provide clean water to local residents.',
        category: 'water',
        tags: ['water', 'community'],
        isPublished: true,
      },
    ]);
  }

  async findAll(page = 1, limit = 6) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.newsModel
        .find({ isPublished: true })
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      this.newsModel.countDocuments({ isPublished: true }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(slug: string) {
    const article = await this.newsModel.findOne({ slug });
    if (!article) throw new NotFoundException('News article not found');
    return article;
  }

  create(dto: CreateNewsDto) {
    const slug = dto.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    return this.newsModel.create({ ...dto, slug });
  }

  async update(id: string, dto: UpdateNewsDto) {
    const payload = { ...dto } as UpdateNewsDto & { slug?: string };
    if (payload.title) {
      payload.slug = payload.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
    }
    const article = await this.newsModel.findByIdAndUpdate(id, payload, { new: true });
    if (!article) throw new NotFoundException('News article not found');
    return article;
  }

  async remove(id: string) {
    const article = await this.newsModel.findByIdAndDelete(id);
    if (!article) throw new NotFoundException('News article not found');
    return { message: 'News article deleted' };
  }
}
