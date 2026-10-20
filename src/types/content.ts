export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  iconName?: string;
  order: number;
  published: boolean;
}

export type EquipmentCategory =
  | "cameras"
  | "lenses"
  | "lighting"
  | "audio"
  | "stabilization"
  | "post_production";

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  categoryLabel: string;
  specification: string;
  description?: string;
  badge?: string;
  isFlagship?: boolean;
  isActive?: boolean;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  phaseName: string;
  description: string;
  deliverables: string[];
}

export interface BehindTheScenesItem {
  id: string;
  title: string;
  projectReference?: string;
  imageUrl: string;
  caption: string;
  roleOrContext: string;
}

export interface ClientEnquiry {
  id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  status: "new" | "reviewed" | "in_discussion" | "archived";
  createdAt: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  supportingText: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  description: string;
  location: string;
  serviceReach: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    vimeo?: string;
    linkedin?: string;
  };
}
