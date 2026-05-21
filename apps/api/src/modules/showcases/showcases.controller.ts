import { Controller, Get, Param } from '@nestjs/common';
import { ShowcasesService } from './showcases.service';
import { Showcase } from '@the-software-guys/types';

@Controller('showcases')
export class ShowcasesController {
  constructor(private readonly showcasesService: ShowcasesService) {}

  @Get()
  async findAll(): Promise<Showcase[]> {
    return this.showcasesService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<Showcase> {
    return this.showcasesService.findBySlug(slug);
  }
}
