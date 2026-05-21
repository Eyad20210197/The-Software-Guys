import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { LeadsService } from './leads.service';
import { NestCreateContactLeadDto } from './dto/create-contact-lead.dto';
import { NestCreateNewsletterLeadDto } from './dto/create-newsletter-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('contact')
  async createContact(@Body() dto: NestCreateContactLeadDto, @Req() req: Request) {
    const ip = req.ip || req.socket.remoteAddress;
    return this.leadsService.createContact(dto, ip);
  }

  @Post('newsletter')
  async createNewsletter(@Body() dto: NestCreateNewsletterLeadDto, @Req() req: Request) {
    const ip = req.ip || req.socket.remoteAddress;
    return this.leadsService.createNewsletter(dto, ip);
  }
}
