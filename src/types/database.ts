export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: "admin" | "editor";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: "admin" | "editor";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          role?: "admin" | "editor";
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          client: string;
          category:
            | "commercial"
            | "brand_film"
            | "event_film"
            | "cinematic_short"
            | "music_video"
            | "documentary";
          description: string;
          synopsis: string | null;
          year: number;
          duration: string | null;
          aspect_ratio: string;
          featured: boolean;
          published: boolean;
          cover_image: string;
          video_url: string | null;
          gallery: Json;
          credits: Json;
          equipment_used: string[];
          deliverables: string[];
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          client: string;
          category:
            | "commercial"
            | "brand_film"
            | "event_film"
            | "cinematic_short"
            | "music_video"
            | "documentary";
          description: string;
          synopsis?: string | null;
          year: number;
          duration?: string | null;
          aspect_ratio?: string;
          featured?: boolean;
          published?: boolean;
          cover_image: string;
          video_url?: string | null;
          gallery?: Json;
          credits?: Json;
          equipment_used?: string[];
          deliverables?: string[];
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          client?: string;
          category?:
            | "commercial"
            | "brand_film"
            | "event_film"
            | "cinematic_short"
            | "music_video"
            | "documentary";
          description?: string;
          synopsis?: string | null;
          year?: number;
          duration?: string | null;
          aspect_ratio?: string;
          featured?: boolean;
          published?: boolean;
          cover_image?: string;
          video_url?: string | null;
          gallery?: Json;
          credits?: Json;
          equipment_used?: string[];
          deliverables?: string[];
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string;
          full_description: string;
          deliverables: string[];
          icon_name: string | null;
          order_index: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description: string;
          full_description: string;
          deliverables?: string[];
          icon_name?: string | null;
          order_index?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          short_description?: string;
          full_description?: string;
          deliverables?: string[];
          icon_name?: string | null;
          order_index?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      equipment: {
        Row: {
          id: string;
          name: string;
          category:
            | "cameras"
            | "lenses"
            | "lighting"
            | "audio"
            | "stabilization"
            | "post_production";
          specification: string;
          description: string | null;
          badge: string | null;
          image_url: string | null;
          is_flagship: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category:
            | "cameras"
            | "lenses"
            | "lighting"
            | "audio"
            | "stabilization"
            | "post_production";
          specification: string;
          description?: string | null;
          badge?: string | null;
          image_url?: string | null;
          is_flagship?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?:
            | "cameras"
            | "lenses"
            | "lighting"
            | "audio"
            | "stabilization"
            | "post_production";
          specification?: string;
          description?: string | null;
          badge?: string | null;
          image_url?: string | null;
          is_flagship?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      enquiries: {
        Row: {
          id: string;
          full_name: string;
          company_name: string | null;
          email: string;
          phone: string | null;
          project_type: string;
          budget_range: string | null;
          message: string;
          status: "new" | "reviewed" | "in_discussion" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          company_name?: string | null;
          email: string;
          phone?: string | null;
          project_type: string;
          budget_range?: string | null;
          message: string;
          status?: "new" | "reviewed" | "in_discussion" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          company_name?: string | null;
          email?: string;
          phone?: string | null;
          project_type?: string;
          budget_range?: string | null;
          message?: string;
          status?: "new" | "reviewed" | "in_discussion" | "archived";
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          brand_name: string;
          tagline: string;
          description: string;
          location: string;
          service_reach: string;
          contact_email: string;
          social_links: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand_name?: string;
          tagline?: string;
          description: string;
          location?: string;
          service_reach?: string;
          contact_email?: string;
          social_links?: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          brand_name?: string;
          tagline?: string;
          description?: string;
          location?: string;
          service_reach?: string;
          contact_email?: string;
          social_links?: Json;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
