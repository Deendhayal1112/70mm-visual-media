-- ==============================================================================
-- 70MM VISUAL MEDIA — Audited Initial Database Schema & Security Architecture
-- Migration: 20250101000000_initial_schema.sql
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Helper Functions & Automation
-- ------------------------------------------------------------------------------

-- Automated updated_at timestamp management
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 2. Authorization Helper Functions (Security Definer with Fixed Search Path)
-- Prevents RLS infinite recursion when evaluating role permissions on public.profiles
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_editor_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
$$;

-- Restrict execution to authenticated users only
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

REVOKE ALL ON FUNCTION public.is_editor_or_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_editor_or_admin() TO authenticated;

-- ------------------------------------------------------------------------------
-- 3. Profiles Table (Administrator & Editor Accounts)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profile Policies
-- Authenticated users can view their own profile; admins can view all profiles
CREATE POLICY "Users can view their own profile or admin can view all"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin());

-- Users can update their own personal info (name), but CANNOT elevate their own role
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (
    -- If user is admin, they can update any field
    public.is_admin()
    OR (
      -- If non-admin user updating own profile, role must remain unchanged
      auth.uid() = id 
      AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
    )
  );

-- Only admins can insert new profiles
CREATE POLICY "Admins can insert profiles"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Only admins can delete profiles (and cannot delete their own profile to prevent lockout)
CREATE POLICY "Admins can delete other profiles"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (public.is_admin() AND auth.uid() <> id);

-- Trigger to strictly forbid non-admin role mutation
CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Privilege escalation rejected: Only administrators can modify user roles.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;

CREATE TRIGGER check_profile_role_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_profile_role();

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 4. Projects Table (Portfolio Repertoire)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN ('commercial', 'brand_film', 'event_film', 'cinematic_short', 'music_video', 'documentary')
  ),
  description TEXT NOT NULL,
  synopsis TEXT,
  year INTEGER NOT NULL CHECK (year >= 2000 AND year <= 2100),
  duration TEXT,
  aspect_ratio TEXT NOT NULL DEFAULT '16:9',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  cover_image TEXT NOT NULL,
  video_url TEXT,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  credits JSONB NOT NULL DEFAULT '[]'::jsonb,
  equipment_used TEXT[] NOT NULL DEFAULT '{}'::text[],
  deliverables TEXT[] NOT NULL DEFAULT '{}'::text[],
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Project Policies
-- Public visitors can only view published projects
CREATE POLICY "Public can view published projects"
  ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Staff (admins and editors) can view all projects including drafts
CREATE POLICY "Staff can view all projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (public.is_editor_or_admin());

-- Staff can insert, update, or delete projects
CREATE POLICY "Staff can manage projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (public.is_editor_or_admin())
  WITH CHECK (public.is_editor_or_admin());

-- Projects Indexes for high-frequency queries
CREATE INDEX IF NOT EXISTS idx_projects_published_order ON public.projects(published, order_index);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured) WHERE featured = true;

CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 5. Services Table (Agency Capabilities)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  deliverables TEXT[] NOT NULL DEFAULT '{}'::text[],
  icon_name TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Services Policies
-- Public visitors can view published services
CREATE POLICY "Public can view published services"
  ON public.services
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Staff can view all services including unpublished drafts
CREATE POLICY "Staff can view all services"
  ON public.services
  FOR SELECT
  TO authenticated
  USING (public.is_editor_or_admin());

-- Staff can manage services
CREATE POLICY "Staff can manage services"
  ON public.services
  FOR ALL
  TO authenticated
  USING (public.is_editor_or_admin())
  WITH CHECK (public.is_editor_or_admin());

-- Services Indexes
CREATE INDEX IF NOT EXISTS idx_services_published_order ON public.services(published, order_index);

CREATE TRIGGER set_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 6. Equipment Table (Technology & Camera Arsenal)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN ('cameras', 'lenses', 'lighting', 'audio', 'stabilization', 'post_production')
  ),
  specification TEXT NOT NULL,
  description TEXT,
  badge TEXT,
  image_url TEXT,
  is_flagship BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;

-- Equipment Policies
-- Public visitors can read ONLY active equipment
CREATE POLICY "Public can view active equipment"
  ON public.equipment
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Staff can view all equipment (including retired/maintenance items)
CREATE POLICY "Staff can view all equipment"
  ON public.equipment
  FOR SELECT
  TO authenticated
  USING (public.is_editor_or_admin());

-- Staff can manage equipment inventory
CREATE POLICY "Staff can manage equipment"
  ON public.equipment
  FOR ALL
  TO authenticated
  USING (public.is_editor_or_admin())
  WITH CHECK (public.is_editor_or_admin());

-- Equipment Indexes
CREATE INDEX IF NOT EXISTS idx_equipment_active_order ON public.equipment(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_equipment_category ON public.equipment(category);

CREATE TRIGGER set_equipment_updated_at
  BEFORE UPDATE ON public.equipment
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 7. Enquiries Table (Confidential Client Inquiries & Briefs)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL CHECK (length(trim(full_name)) > 0 AND length(full_name) <= 255),
  company_name TEXT CHECK (company_name IS NULL OR length(company_name) <= 255),
  email TEXT NOT NULL CHECK (length(trim(email)) > 0 AND length(email) <= 255 AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT CHECK (phone IS NULL OR length(phone) <= 50),
  project_type TEXT NOT NULL CHECK (length(trim(project_type)) > 0 AND length(project_type) <= 100),
  budget_range TEXT CHECK (budget_range IS NULL OR length(budget_range) <= 100),
  message TEXT NOT NULL CHECK (length(trim(message)) > 0 AND length(message) <= 5000),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'in_discussion', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Enquiries Policies
-- Restricted insertion: Public can only insert with status = 'new' and validated non-empty fields
CREATE POLICY "Public visitors can submit new enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'new'
    AND length(trim(full_name)) > 0
    AND length(trim(email)) > 0
    AND length(trim(message)) > 0
  );

-- ONLY full administrators can read client briefs (editors are excluded to preserve confidentiality)
CREATE POLICY "Admins can view enquiries"
  ON public.enquiries
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- ONLY full administrators can update status or manage client briefs
CREATE POLICY "Admins can update enquiries"
  ON public.enquiries
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ONLY full administrators can delete spam or obsolete briefs
CREATE POLICY "Admins can delete enquiries"
  ON public.enquiries
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Enquiries Indexes
CREATE INDEX IF NOT EXISTS idx_enquiries_status_created ON public.enquiries(status, created_at DESC);

CREATE TRIGGER set_enquiries_updated_at
  BEFORE UPDATE ON public.enquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 8. Site Settings Table (Agency Metadata - Singleton Record)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default' CHECK (id = 'default'),
  brand_name TEXT NOT NULL DEFAULT '70MM VISUAL MEDIA',
  tagline TEXT NOT NULL DEFAULT 'From Script to Screen. From Vision to Final Delivery.',
  description TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Chennai, Tamil Nadu, India',
  service_reach TEXT NOT NULL DEFAULT 'Serving clients across India',
  contact_email TEXT NOT NULL DEFAULT 'contact@70mmvisualmedia.com',
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Site Settings Policies
-- Public can view site settings
CREATE POLICY "Public can view site settings"
  ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ONLY full administrators can update site settings
CREATE POLICY "Admins can update site settings"
  ON public.site_settings
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ONLY full administrators can insert the singleton if not existing
CREATE POLICY "Admins can insert site settings"
  ON public.site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE TRIGGER set_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 9. Storage Buckets Provisioning & Storage Security Policies
-- Provisions public and private buckets with strict size and MIME type guards
-- ------------------------------------------------------------------------------

-- Insert storage buckets into storage.buckets if storage schema exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'storage' AND table_name = 'buckets') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES
      ('portfolio', 'portfolio', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]),
      ('bts', 'bts', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]),
      ('equipment', 'equipment', true, 8388608, ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]),
      ('hero', 'hero', true, 26214400, ARRAY['image/jpeg', 'image/png', 'image/webp', 'video/mp4']::text[]),
      ('documents', 'documents', false, 15728640, ARRAY['application/pdf']::text[])
    ON CONFLICT (id) DO UPDATE SET
      public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;
  END IF;
END $$;
