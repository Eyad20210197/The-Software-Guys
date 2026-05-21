import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { DashboardAnalytics } from '@the-software-guys/types';

@Injectable()
export class AdminService {
  constructor(private readonly db: DbService) {}

  async getAnalytics(): Promise<DashboardAnalytics> {
    const totalLeads = await this.db.prisma.contactLead.count();
    const pendingLeads = await this.db.prisma.contactLead.count({ where: { status: 'PENDING' } });
    const totalShowcases = await this.db.prisma.showcase.count();
    const featuredShowcases = await this.db.prisma.showcase.count({ where: { isFeatured: true } });
    const newsletterSubscribers = await this.db.prisma.newsletterLead.count({ where: { active: true } });

    return {
      totalLeads,
      pendingLeads,
      totalShowcases,
      featuredShowcases,
      newsletterSubscribers,
    };
  }
}
