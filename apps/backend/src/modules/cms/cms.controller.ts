import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CmsService } from './cms.service';
import { UpsertCmsPageDto } from './dto/upsert-cms-page.dto';

@ApiTags('CMS')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('pages')
  findAllPages() {
    return this.cmsService.findAll();
  }

  @Get('pages/:slug')
  findPageBySlug(@Param('slug') slug: string) {
    return this.cmsService.findBySlug(slug);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('pages/:slug')
  upsertPageBySlug(@Param('slug') slug: string, @Body() dto: UpsertCmsPageDto) {
    return this.cmsService.upsertBySlug(slug, dto);
  }
}
