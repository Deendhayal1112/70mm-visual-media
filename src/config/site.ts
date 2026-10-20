import { BRAND_INFO, PUBLIC_NAV_LINKS } from "@/lib/constants";

export const siteConfig = {
  name: BRAND_INFO.name,
  shortName: BRAND_INFO.shortName,
  tagline: BRAND_INFO.tagline,
  description: BRAND_INFO.description,
  url: "https://70mmvisualmedia.com",
  location: BRAND_INFO.location,
  reach: BRAND_INFO.reach,
  navItems: PUBLIC_NAV_LINKS,
  links: {
    email: `mailto:${BRAND_INFO.contactEmail}`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
