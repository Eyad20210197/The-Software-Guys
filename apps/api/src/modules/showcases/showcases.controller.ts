import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ShowcasesService } from './showcases.service';
import { Showcase } from '@the-software-guys/types';
import { AuthGuard } from '../auth/auth.guard';

@Controller('showcases')
export class ShowcasesController {
  constructor(private readonly showcasesService: ShowcasesService) {}

  @Get()
  async findAll(): Promise<Showcase[]> {
    return this.showcasesService.findAll();
  }

  @Get('admin')
  @UseGuards(AuthGuard)
  async findAdminAll(): Promise<Showcase[]> {
    return this.showcasesService.findAdminAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<Showcase> {
    return this.showcasesService.findBySlug(slug);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() dto: any): Promise<Showcase> {
    return this.showcasesService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() dto: any): Promise<Showcase> {
    return this.showcasesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.showcasesService.delete(id);
    return { success };
  }
}
