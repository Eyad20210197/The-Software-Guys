import { Controller, Post, Body, Req, UseGuards, Get, Patch, Delete, Param } from '@nestjs/common';
import { Request } from 'express';
import { LeadsService } from './leads.service';
import { NestCreateContactLeadDto } from './dto/create-contact-lead.dto';
import { NestCreateNewsletterLeadDto } from './dto/create-newsletter-lead.dto';
import { AuthGuard } from '../auth/auth.guard';

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

  @Get('admin')
  @UseGuards(AuthGuard)
  async getContacts() {
    return this.leadsService.findAllContacts();
  }

  @Patch('admin/:id/status')
  @UseGuards(AuthGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.leadsService.updateContactStatus(id, status);
  }

  @Delete('admin/:id')
  @UseGuards(AuthGuard)
  async deleteLead(@Param('id') id: string) {
    return this.leadsService.deleteContact(id);
  }

  @Get('newsletter/admin')
  @UseGuards(AuthGuard)
  async getNewsletters() {
    return this.leadsService.findAllNewsletters();
  }
}
