import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CmsController } from './cms.controller';
import { CmsPage, CmsPageSchema } from './cms-page.schema';
import { CmsService } from './cms.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CmsPage.name, schema: CmsPageSchema }])],
  controllers: [CmsController],
  providers: [CmsService],
  exports: [CmsService],
})
export class CmsModule {}
