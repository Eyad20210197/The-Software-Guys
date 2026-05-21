import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Showcase } from '@the-software-guys/types';

@Injectable()
export class ShowcasesService {
  constructor(private readonly db: DbService) {}

  async findAll(): Promise<Showcase[]> {
    const list = await this.db.prisma.showcase.findMany({
      where: { isPublished: true },
      include: {
        technologies: true,
        assets: true,
        seoMetadata: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return list as unknown as Showcase[];
  }

  async findBySlug(slug: string): Promise<Showcase> {
    const item = await this.db.prisma.showcase.findUnique({
      where: { slug },
      include: {
        technologies: true,
        assets: true,
        seoMetadata: true,
      },
    });
    if (!item) {
      throw new NotFoundException(`Showcase with slug "${slug}" not found`);
    }
    return item as unknown as Showcase;
  }
}
