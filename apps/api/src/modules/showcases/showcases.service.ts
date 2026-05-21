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

  async findAdminAll(): Promise<Showcase[]> {
    const list = await this.db.prisma.showcase.findMany({
      include: {
        technologies: true,
        assets: true,
        seoMetadata: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return list as unknown as Showcase[];
  }

  async create(dto: any): Promise<Showcase> {
    const { technologies, assets, seoMetadata, ...data } = dto;

    let seoMetadataId: string | undefined;
    if (seoMetadata) {
      const seo = await this.db.prisma.sEOMetadata.upsert({
        where: { path: seoMetadata.path || `/showcases/${data.slug}` },
        update: {
          metaTitle: seoMetadata.metaTitle,
          metaDescription: seoMetadata.metaDescription,
          keywords: seoMetadata.keywords || [],
          isOptimized: true,
        },
        create: {
          path: seoMetadata.path || `/showcases/${data.slug}`,
          metaTitle: seoMetadata.metaTitle,
          metaDescription: seoMetadata.metaDescription,
          keywords: seoMetadata.keywords || [],
          isOptimized: true,
        },
      });
      seoMetadataId = seo.id;
    }

    const item = await this.db.prisma.showcase.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        slug: data.slug,
        description: data.description,
        category: data.category,
        clientName: data.clientName,
        projectUrl: data.projectUrl,
        mainImage: data.mainImage,
        isFeatured: data.isFeatured ?? false,
        isPublished: data.isPublished ?? true,
        seoMetadataId,
        technologies: {
          create: technologies?.map((t: any) => ({
            name: t.name || t,
            category: t.category || 'Core Stack',
            icon: t.icon || '',
          })) || [],
        },
        assets: {
          create: assets?.map((a: any) => ({
            type: a.type || 'IMAGE',
            url: a.url || a,
            altText: a.altText || '',
            position: a.position || 0,
          })) || [],
        },
      },
      include: {
        technologies: true,
        assets: true,
        seoMetadata: true,
      },
    });

    return item as unknown as Showcase;
  }

  async update(id: string, dto: any): Promise<Showcase> {
    const { technologies, assets, seoMetadata, ...data } = dto;

    // Clean relations first if they are passed explicitly to update
    if (technologies) {
      await this.db.prisma.showcaseTech.deleteMany({ where: { showcaseId: id } });
    }
    if (assets) {
      await this.db.prisma.showcaseAsset.deleteMany({ where: { showcaseId: id } });
    }

    let seoMetadataId: string | undefined;
    if (seoMetadata) {
      const seo = await this.db.prisma.sEOMetadata.upsert({
        where: { path: seoMetadata.path || `/showcases/${data.slug || ''}` },
        update: {
          metaTitle: seoMetadata.metaTitle,
          metaDescription: seoMetadata.metaDescription,
          keywords: seoMetadata.keywords || [],
          isOptimized: true,
        },
        create: {
          path: seoMetadata.path || `/showcases/${data.slug || ''}`,
          metaTitle: seoMetadata.metaTitle,
          metaDescription: seoMetadata.metaDescription,
          keywords: seoMetadata.keywords || [],
          isOptimized: true,
        },
      });
      seoMetadataId = seo.id;
    }

    const updateData: any = {
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      description: data.description,
      category: data.category,
      clientName: data.clientName,
      projectUrl: data.projectUrl,
      mainImage: data.mainImage,
      isFeatured: data.isFeatured,
      isPublished: data.isPublished,
    };

    if (seoMetadataId) {
      updateData.seoMetadataId = seoMetadataId;
    }

    if (technologies) {
      updateData.technologies = {
        create: technologies.map((t: any) => ({
          name: t.name || t,
          category: t.category || 'Core Stack',
          icon: t.icon || '',
        })),
      };
    }

    if (assets) {
      updateData.assets = {
        create: assets.map((a: any) => ({
          type: a.type || 'IMAGE',
          url: a.url || a,
          altText: a.altText || '',
          position: a.position || 0,
        })),
      };
    }

    const item = await this.db.prisma.showcase.update({
      where: { id },
      data: updateData,
      include: {
        technologies: true,
        assets: true,
        seoMetadata: true,
      },
    });

    return item as unknown as Showcase;
  }

  async delete(id: string): Promise<boolean> {
    await this.db.prisma.showcase.delete({
      where: { id },
    });
    return true;
  }
}
