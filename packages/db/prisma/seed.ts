import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, 'salt-software-guys-2026', 1000, 64, 'sha512').toString('hex');
}

const mockShowcases = [
  {
    title: 'Nexus Analytics System',
    subtitle: 'High-performance real-time SaaS telemetry and reporting pipelines.',
    slug: 'nexus-analytics',
    description: 'A custom enterprise-grade SaaS telemetry platform built to aggregate, process, and display live metrics from microservice backends. Integrates a custom high-performance dashboard with deep query optimization.',
    category: 'saas',
    clientName: 'Nexus Corp Solutions',
    projectUrl: 'https://nexus-analytics.demo',
    mainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    isPublished: true,
    technologies: ['Next.js', 'NestJS', 'Neon Postgres', 'Prisma ORM', 'TailwindCSS', 'TanStack Query', 'Chart.js'],
    breakdown: 'We engineered the system around a NestJS modular monolith with strict class-validator DTO pipelines. The database is hosted on Neon serverless PostgreSQL, utilizing database connection pooling to scale dynamically. NextAuth.js guarantees HTTP-only cookie validation and protects dashboard endpoints against privilege escalation. The frontend translates completely into LTR and RTL layouts dynamically, maintaining pixel-perfect typography matching Geist font rules.',
    testimonial: {
      quote: 'The Software Guys delivered our reporting framework six weeks ahead of schedule. The query speeds are incredible, and the brutalist admin panel is extremely user-friendly. Their architecture saved us thousands in maintenance.',
      author: 'Sarah Jenkins',
      role: 'CEO, Nexus Corp Solutions'
    }
  },
  {
    title: 'Riyadh Shipping & Logistics',
    subtitle: 'Bilingual mobile tracking dashboard and geo-fencing system.',
    slug: 'riyadh-logistics',
    description: 'A high-density mobile app and dispatch control system managing driver routes, cargo tracking, and dynamic Arabic/English RTL synchronization. Built to perform in low-connectivity areas.',
    category: 'mobile',
    clientName: 'Riyadh Shipping Group',
    projectUrl: 'https://riyadh-logistics.demo',
    mainImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    isPublished: true,
    technologies: ['React Native', 'NestJS Monolith', 'Neon PostgreSQL', 'Prisma Client', 'Expo', 'Google Maps API'],
    breakdown: 'This system required logical layout spacing to handle instant translation switching. We crafted custom navigation screens in React Native that adapt directly to Arabic RTL direction rules. The NestJS backend integrates rate-limiting, secure lead logs, and structured database audits to prevent repudiation risks. Google Maps APIs calculate driver route offsets, updating the dispatch panel live via WebSockets.',
    testimonial: {
      quote: 'عمل هندسي ممتاز ودقة متناهية في التصميم. استطاع الفريق تلبية متطلبات النظام اللغوية وإطلاق التطبيق في وقت قياسي وبأداء لا يصدق.',
      author: 'Yousef Al-Mansoori',
      role: 'Founder, Riyadh Shipping Group'
    }
  },
  {
    title: 'Electric Foundry System',
    subtitle: 'Universal Neo-Brutalist design tokens and bilingual theme system.',
    slug: 'foundry-design',
    description: 'A comprehensive, high-contrast component library and UX guidelines featuring bold borders, sulphur offset shadows, and Geist geometric fonts. Shared as a corporate standard across five SaaS properties.',
    category: 'design',
    clientName: 'Electric Foundry Ltd',
    projectUrl: 'https://foundry-design.demo',
    mainImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    isPublished: true,
    technologies: ['TailwindCSS', 'Figma API', 'React', 'Storybook', 'TypeScript'],
    breakdown: 'We extracted design tokens directly from Stitch and codified them into strict Tailwind properties. Spacing uses a rigid 4px unit grid. Borders are universal solid dark 3px lines, combined with retro flat drop shadows. Rounded corners are disabled for branding elements, while standard buttons use a comfortable 8px radius. The system supports full RTL translation swapping by utilizing logical spacing utilities only.',
    testimonial: {
      quote: 'Our design workflow has been cut in half. The code components map 100% to our designer frames, and the accessibility ratings have jumped to a perfect AAA.',
      author: 'Marcus Vance',
      role: 'VP of Product, Electric Foundry'
    }
  },
  {
    title: 'Nexus Migration CLI Sync',
    subtitle: 'Automated schema synchronizer and migration pipeline developer tool.',
    slug: 'nexus-cli',
    description: 'An open-source terminal developer utility that bridges local database models directly to serverless Neon Postgres branches, creating instant ephemeral database environments.',
    category: 'dev',
    clientName: 'The Software Guys OSS',
    projectUrl: 'https://github.com/tsg-oss/nexus-cli',
    mainImage: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    isPublished: true,
    technologies: ['Node.js CLI', 'TypeScript', 'Prisma Schema Engine', 'Neon Data API', 'Commander'],
    breakdown: 'Built as an engineering utility tool. It connects directly to the Neon REST API to provision sandbox databases in milliseconds, then executes Prisma db push commands synchronously. Includes security verification gates to ensure credentials are never leaked in terminal logs.',
    testimonial: {
      quote: 'An indispensable tool for our developers. Provisioning sandbox databases on push and syncing schemas takes seconds now.',
      author: 'Devin Cole',
      role: 'DevOps Lead, SaaS Rocket'
    }
  }
];

async function main() {
  console.log('🔄 Cleaning existing database records...');
  await prisma.session.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.showcaseTech.deleteMany();
  await prisma.showcaseAsset.deleteMany();
  await prisma.showcase.deleteMany();
  await prisma.contactLead.deleteMany();
  await prisma.newsletterLead.deleteMany();
  await prisma.sEOMetadata.deleteMany();

  console.log('🔑 Creating default administrator account...');
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@thesoftwareguys.com';
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'secure-super-brutal-admin-pass-2026';
  const adminName = process.env.DEFAULT_ADMIN_NAME || 'The Software Guys Admin';

  const admin = await prisma.admin.create({
    data: {
      email: adminEmail,
      name: adminName,
      passwordHash: hashPassword(adminPassword),
      role: 'SUPERADMIN',
    },
  });
  console.log(`✅ Default admin created: ${admin.email}`);

  console.log('📦 Seeding showcase portfolio projects...');
  for (const item of mockShowcases) {
    // 1. Create SEO metadata first
    const seo = await prisma.sEOMetadata.create({
      data: {
        path: `/showcases/${item.slug}`,
        metaTitle: `${item.title} | Shipped by The Software Guys`,
        metaDescription: item.subtitle,
        keywords: item.technologies,
        isOptimized: true,
      },
    });

    // 2. Create the showcase
    const showcase = await prisma.showcase.create({
      data: {
        title: item.title,
        subtitle: item.subtitle,
        slug: item.slug,
        description: item.description,
        category: item.category,
        clientName: item.clientName,
        projectUrl: item.projectUrl,
        mainImage: item.mainImage,
        isFeatured: item.isFeatured,
        isPublished: item.isPublished,
        seoMetadataId: seo.id,
      },
    });

    // 3. Create technologies relations
    for (const tech of item.technologies) {
      await prisma.showcaseTech.create({
        data: {
          showcaseId: showcase.id,
          name: tech,
          category: 'Core Stack',
        },
      });
    }

    // 4. Create image assets as a demo asset
    await prisma.showcaseAsset.create({
      data: {
        showcaseId: showcase.id,
        type: 'IMAGE',
        url: item.mainImage,
        altText: item.title,
        position: 0,
      },
    });

    console.log(`✅ Shipped showcase model seeded: ${showcase.slug}`);
  }

  // Seed default pages SEO Metadata
  console.log('🌐 Seeding page-level SEO metadata...');
  const pageSeo = [
    { path: '/', title: 'The Software Guys | Custom SaaS & Monolith Backends', desc: 'Production-ready Neo-Brutalist SaaS development with Neon PostgreSQL database connections.' },
    { path: '/services', title: 'Engineering Services | NestJS Modular Monolith Pipelines', desc: 'We build database triggers, class DTO inputs validation, and STRIDE security systems.' },
    { path: '/showcases', title: 'Enterprise Portfolios | Shipped Systems Live in Production', desc: 'See our high-performance bilingual SaaS telemetry platforms, mobile layouts, and OSS CLI tools.' },
    { path: '/contact', title: "Let's Discuss | Connect Direct with Lead Engineers", desc: 'Transmit your project specifications directly to our senior developer guys.' }
  ];

  for (const page of pageSeo) {
    await prisma.sEOMetadata.create({
      data: {
        path: page.path,
        metaTitle: page.title,
        metaDescription: page.desc,
        keywords: ['SaaS', 'Brutalist', 'Next.js', 'NestJS', 'Prisma', 'Neon Postgres', 'Agile', 'Arabic', 'English'],
        isOptimized: true,
      },
    });
  }

  // Seed standard contact leads for demonstration
  console.log('📧 Seeding contact leads...');
  const leadDemo = [
    {
      firstName: 'Sarah',
      lastName: 'Jenkins',
      email: 'sjenkins@nexus-corp.com',
      projectType: 'saas',
      message: 'Looking for a high-performance telemetry dashboard using NestJS backend monolith and Neon PostgreSQL. Need complete STRIDE modeling.',
      status: 'PENDING' as const,
    },
    {
      firstName: 'Yousef',
      lastName: 'Al-Mansoori',
      email: 'yousef@riyadh-logis.sa',
      projectType: 'mobile',
      message: 'تطبيق هاتف مع تتبع مباشر للخرائط ودعم كامل للغة العربية. الميزانية ممتازة والجدول الزمني مضغوط.',
      status: 'REVIEWED' as const,
    },
    {
      firstName: 'Marcus',
      lastName: 'Vance',
      email: 'm.vance@electric-foundry.com',
      projectType: 'design',
      message: 'Need a unified brutalist theme platform extracted directly from our custom Stitch prototypes.',
      status: 'CONTACTED' as const,
    }
  ];

  for (const lead of leadDemo) {
    await prisma.contactLead.create({
      data: lead,
    });
  }

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed with error:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
