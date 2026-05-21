import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateContactLeadDto, CreateNewsletterLeadDto } from '@the-software-guys/types';

@Injectable()
export class LeadsService {
  constructor(private readonly db: DbService) {}

  async createContact(dto: CreateContactLeadDto, ipAddress?: string) {
    const lead = await this.db.prisma.contactLead.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        projectType: dto.projectType,
        message: dto.message,
        ipAddress,
      },
    });
    return { success: true, leadId: lead.id };
  }

  async createNewsletter(dto: CreateNewsletterLeadDto, ipAddress?: string) {
    const lead = await this.db.prisma.newsletterLead.upsert({
      where: { email: dto.email },
      update: { active: true },
      create: {
        email: dto.email,
        active: true,
        ipAddress,
      },
    });
    return { success: true, leadId: lead.id };
  }

  async findAllContacts() {
    return this.db.prisma.contactLead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateContactStatus(id: string, status: any) {
    const updated = await this.db.prisma.contactLead.update({
      where: { id },
      data: { status },
    });
    return { success: true, lead: updated };
  }

  async deleteContact(id: string) {
    await this.db.prisma.contactLead.delete({
      where: { id },
    });
    return { success: true };
  }

  async findAllNewsletters() {
    return this.db.prisma.newsletterLead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
