import { Controller, Get, Post, Body, Query, UseGuards, Delete, Param } from '@nestjs/common';
import { SeoService } from './seo.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get()
  async getByPath(@Query('path') path: string) {
    return this.seoService.getMetadataByPath(path);
  }

  @Get('admin')
  @UseGuards(AuthGuard)
  async getAdminAll() {
    return this.seoService.findAll();
  }

  @Post('admin')
  @UseGuards(AuthGuard)
  async updatePath(@Body('path') path: string, @Body() dto: any) {
    return this.seoService.updateMetadata(path, dto);
  }

  @Delete('admin/:id')
  @UseGuards(AuthGuard)
  async deletePath(@Param('id') id: string) {
    return this.seoService.deleteMetadata(id);
  }
}
