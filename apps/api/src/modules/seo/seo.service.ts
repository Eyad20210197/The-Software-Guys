import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class SeoService {
  constructor(private readonly db: DbService) {}

  async getMetadataByPath(path: string) {
    const meta = await this.db.prisma.sEOMetadata.findUnique({
      where: { path },
    });
    if (!meta) {
      // Return a default fallback
      return {
        path,
        metaTitle: 'The Software Guys | SaaS Portfolio Platform',
        metaDescription: 'Production-ready bilingual SaaS portfolio and admin center.',
        keywords: ['SaaS', 'Brutalist', 'NextJS', 'NestJS', 'Neon Postgres'],
        isOptimized: false,
      };
    }
    return meta;
  }

  async findAll() {
    return this.db.prisma.sEOMetadata.findMany({
      orderBy: { path: 'asc' },
    });
  }

  async updateMetadata(path: string, dto: any) {
    return this.db.prisma.sEOMetadata.upsert({
      where: { path },
      update: {
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        keywords: dto.keywords || [],
        isOptimized: dto.isOptimized ?? true,
      },
      create: {
        path,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        keywords: dto.keywords || [],
        isOptimized: dto.isOptimized ?? true,
      },
    });
  }

  async deleteMetadata(id: string) {
    await this.db.prisma.sEOMetadata.delete({
      where: { id },
    });
    return { success: true };
  }
}
