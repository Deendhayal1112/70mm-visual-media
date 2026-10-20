# 70MM VISUAL MEDIA — Supabase Storage Architecture Plan

This document defines the storage strategy for visual media, film stills, camera photography, and video streaming assets.

---

## 1. Storage Buckets & Policies

| Bucket Name | Access Level | Allowed MIME Types | Max File Size | Purpose |
|---|---|---|---|---|
| `portfolio` | Public Read / Admin Write | `image/jpeg`, `image/png`, `image/webp` | 10 MB | 4K project stills, horizontal 2.39:1 & 16:9 thumbnails, client campaign frames |
| `bts` | Public Read / Admin Write | `image/jpeg`, `image/png`, `image/webp` | 10 MB | High-resolution on-set photography, lighting setups, director monitor captures |
| `equipment` | Public Read / Admin Write | `image/jpeg`, `image/png`, `image/webp` | 8 MB | Studio photography of ARRI Alexa, RED, Sony, lenses, and DJI drones |
| `hero` | Public Read / Admin Write | `image/jpeg`, `image/png`, `image/webp`, `video/mp4` | 25 MB | High-impact homepage hero background imagery and short loop banners |
| `documents` | Private (Admin Only) | `application/pdf` | 15 MB | Creative pitch treatments, production estimates, script drafts, call sheets |

---

## 2. Row-Level Security (RLS) for Storage Buckets

All storage buckets in Supabase use the `storage.objects` table. The following policies must be applied when provisioning buckets:

### A. Public Read Policies
Public website visitors can view image and video assets in public media buckets, but CANNOT access the private `documents` bucket:

```sql
-- Allow public access to view media assets in public buckets
CREATE POLICY "Public Read Access for Public Buckets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id IN ('portfolio', 'bts', 'equipment', 'hero'));

-- Allow only administrators to read private client documents
CREATE POLICY "Admin Read Documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND public.is_admin());
```

### B. Authenticated Staff Upload & Deletion Policies
Authorized staff (admins and editors) can upload media assets, while only administrators can manage sensitive documents:

```sql
-- Allow staff (admins and editors) to upload to public media buckets
CREATE POLICY "Staff Media Upload Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('portfolio', 'bts', 'equipment', 'hero')
  AND public.is_editor_or_admin()
);

-- Allow administrators to upload to private documents bucket
CREATE POLICY "Admin Documents Upload Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents'
  AND public.is_admin()
);

-- Allow staff to update media assets
CREATE POLICY "Staff Media Update Access"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('portfolio', 'bts', 'equipment', 'hero')
  AND public.is_editor_or_admin()
);

-- Allow staff to delete media assets
CREATE POLICY "Staff Media Delete Access"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id IN ('portfolio', 'bts', 'equipment', 'hero')
  AND public.is_editor_or_admin()
);

-- Allow only administrators to delete private documents
CREATE POLICY "Admin Documents Delete Access"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents'
  AND public.is_admin()
);
```

---

## 3. Video Assets & Streaming Strategy

Cinema production houses manage high-bitrate ProRes and Raw video footage. To ensure optimal Largest Contentful Paint (LCP) and smooth playback across consumer devices:

1. **Short Video Loops & Teasers (< 20MB):**
   - Stored directly in the `hero` or `portfolio` Supabase Storage bucket.
   - Encoded with H.264/HEVC or WebM with fast-start enabled (`moov` atom at the front of the file).
2. **Full-Length Commercials & Master Reels (> 100MB):**
   - High-throughput video streaming should be routed through dedicated video hosting infrastructures (Vimeo OTT, Cloudflare Stream, or Mux).
   - The Supabase `projects` table stores the validated streaming embed or HLS URL (`video_url`), while high-resolution video thumbnail stills remain served from Supabase Storage.
3. **Draft Privacy:**
   - Publicly displayed assets in storage buckets are identified by content-hashed filenames or UUIDs. Draft project metadata in the `projects` table is strictly protected by database RLS (`published = true`), ensuring unreleased commercial campaigns are never discoverable prior to their official launch.
