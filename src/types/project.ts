export type ProjectCategory =
  | "commercial"
  | "brand_film"
  | "event_film"
  | "cinematic_short"
  | "music_video"
  | "documentary";

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface ProjectMedia {
  id: string;
  type: "image" | "video";
  url: string;
  altText: string;
  isCover?: boolean;
  aspectRatio?: string;
  width?: number;
  height?: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  synopsis?: string;
  year: number;
  duration?: string;
  aspectRatio?: string;
  featured: boolean;
  published: boolean;
  coverImage: string;
  videoUrl?: string;
  gallery: ProjectMedia[];
  credits?: ProjectCredit[];
  equipmentUsed?: string[];
  deliverables?: string[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectFilterOption = {
  label: string;
  value: ProjectCategory | "all";
};
