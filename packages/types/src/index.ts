// 1. Roles and Enums
export type AdminRole = 'SUPERADMIN' | 'EDITOR';
export type LeadStatus = 'PENDING' | 'REVIEWED' | 'CONTACTED' | 'ARCHIVED';
export type AssetType = 'IMAGE' | 'VIDEO';

// 2. Core Entities
export interface Admin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Session {
  id: string;
  adminId: string;
  token: string;
  expiresAt: Date | string;
  createdAt: Date | string;
}

export interface SEOMetadata {
  id: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  ogImage?: string | null;
  keywords: string[];
  isOptimized: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ShowcaseTech {
  id: string;
  showcaseId: string;
  name: string;
  category: string;
  icon?: string | null;
  createdAt: Date | string;
}

export interface ShowcaseAsset {
  id: string;
  showcaseId: string;
  type: AssetType;
  url: string;
  altText?: string | null;
  position: number;
  createdAt: Date | string;
}

export interface Showcase {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  category: string;
  clientName: string;
  projectUrl?: string | null;
  mainImage: string;
  isFeatured: boolean;
  isPublished: boolean;
  technologies?: ShowcaseTech[];
  assets?: ShowcaseAsset[];
  seoMetadata?: SEOMetadata | null;
  seoMetadataId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ContactLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  message: string;
  status: LeadStatus;
  ipAddress?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface NewsletterLead {
  id: string;
  email: string;
  active: boolean;
  ipAddress?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// 3. API Requests & DTO Contracts (Interface representations)
export interface CreateContactLeadDto {
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  message: string;
}

export interface CreateNewsletterLeadDto {
  email: string;
}

export interface UpdateLeadStatusDto {
  status: LeadStatus;
}

export interface CreateShowcaseDto {
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  category: string;
  clientName: string;
  projectUrl?: string;
  mainImage: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  technologies?: Omit<ShowcaseTech, 'id' | 'showcaseId' | 'createdAt'>[];
  assets?: Omit<ShowcaseAsset, 'id' | 'showcaseId' | 'createdAt'>[];
  seoMetadata?: Omit<SEOMetadata, 'id' | 'isOptimized' | 'createdAt' | 'updatedAt'>;
}

export type UpdateShowcaseDto = Partial<CreateShowcaseDto>;

// 4. API Standard Responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DashboardAnalytics {
  totalLeads: number;
  pendingLeads: number;
  totalShowcases: number;
  featuredShowcases: number;
  newsletterSubscribers: number;
}
