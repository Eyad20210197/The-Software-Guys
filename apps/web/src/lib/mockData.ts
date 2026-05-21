export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  category: 'saas' | 'mobile' | 'design' | 'dev';
  categoryLabel: string;
  clientName: string;
  projectUrl: string;
  mainImage: string;
  isFeatured: boolean;
  isPublished: boolean;
  technologies: string[];
  breakdown: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const mockShowcases: ShowcaseItem[] = [
  {
    id: 'nexus-analytics-id',
    title: 'Nexus Analytics System',
    subtitle: 'High-performance real-time SaaS telemetry and reporting pipelines.',
    slug: 'nexus-analytics',
    description: 'A custom enterprise-grade SaaS telemetry platform built to aggregate, process, and display live metrics from microservice backends. Integrates a custom high-performance dashboard with deep query optimization.',
    category: 'saas',
    categoryLabel: 'Custom SaaS Platform',
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
    id: 'riyadh-logistics-id',
    title: 'Riyadh Shipping & Logistics',
    subtitle: 'Bilingual mobile tracking dashboard and driver geo-fencing system.',
    slug: 'riyadh-logistics',
    description: 'A high-density mobile app and dispatch control system managing driver routes, cargo tracking, and dynamic Arabic/English RTL synchronization. Built to perform in low-connectivity areas.',
    category: 'mobile',
    categoryLabel: 'Mobile Application',
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
    id: 'foundry-design-id',
    title: 'Electric Foundry System',
    subtitle: 'Universal Neo-Brutalist design tokens and bilingual theme system.',
    slug: 'foundry-design',
    description: 'A comprehensive, high-contrast component library and UX guidelines featuring bold borders, sulphur offset shadows, and Geist geometric fonts. Shared as a corporate standard across five SaaS properties.',
    category: 'design',
    categoryLabel: 'Design System & UX',
    clientName: 'Electric Foundry Ltd',
    projectUrl: 'https://foundry-design.demo',
    mainImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    isPublished: true,
    technologies: ['TailwindCSS', 'Figma API', 'React', 'Storybook', 'TypeScript'],
    breakdown: 'We extracted design tokens directly from Stitch and codified them into strict Tailwind properties. Spacing uses a rigid 4px unit grid. Borders are universal solid dark 3px lines, combined with retro retro flat drop shadows. Rounded corners are disabled for branding elements, while standard buttons use a comfortable 8px radius. The system supports full RTL translation swapping by utilizing logical spacing utilities only.',
    testimonial: {
      quote: 'Our design workflow has been cut in half. The code components map 100% to our designer frames, and the accessibility ratings have jumped to a perfect AAA.',
      author: 'Marcus Vance',
      role: 'VP of Product, Electric Foundry'
    }
  },
  {
    id: 'nexus-cli-id',
    title: 'Nexus Migration CLI Sync',
    subtitle: 'Automated schema synchronizer and migration pipeline developer tool.',
    slug: 'nexus-cli',
    description: 'An open-source terminal developer utility that bridges local database models directly to serverless Neon Postgres branches, creating instant ephemeral database environments.',
    category: 'dev',
    categoryLabel: 'Developer Tooling',
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
