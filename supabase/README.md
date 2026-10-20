# 70MM VISUAL MEDIA — Supabase Integration & Architecture Guide

This guide details the steps required to connect, configure, and maintain the Supabase backend for **70MM VISUAL MEDIA**.

---

## 1. Overview of Supabase Integration

Phase 3 Step 1 establishes a modular, type-safe backend architecture within the Next.js App Router codebase:

- **Browser Client (`src/lib/supabase/client.ts`):** Client-side singleton for interactive components.
- **Server Client (`src/lib/supabase/server.ts`):** Asynchronous server client for Server Components, Server Actions, and Route Handlers utilizing the Next.js `cookies()` API.
- **Session Middleware (`src/middleware.ts` & `src/lib/supabase/middleware.ts`):** Automatic cookie-based session validation and token refreshing.
- **Configuration Validator (`src/lib/supabase/config.ts`):** Safe environment variable detection and descriptive error reporting.
- **Database Schema & Migrations (`supabase/migrations/`):** Full relational schema with Row-Level Security (RLS) for projects, services, equipment, enquiries, and profiles.
- **Storage Architecture (`supabase/STORAGE.md`):** Multi-bucket storage policy for 4K stills, behind-the-scenes photography, and video delivery.

---

## 2. Setting Up a Supabase Project

### Step A: Create or Open a Supabase Project
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project** and select your organization.
3. Configure the project:
   - **Name:** `70MM Visual Media`
   - **Database Password:** Generate and securely save a strong password in your password manager.
   - **Region:** Select **South Asia (Mumbai - ap-south-1)** or the closest region to your primary audience in India.
4. Click **Create new project** and allow provisioning to complete.

### Step B: Locate Your Project Credentials
In your Supabase project dashboard:
1. Navigate to **Project Settings** (gear icon in the sidebar) -> **API**.
2. Locate the following values:
   - **Project URL:** Found under *Project URL* (e.g., `https://abcdefghijklmnopqrst.supabase.co`).
   - **Publishable Key:** Found under *Project API keys* as `publishable` or `anon public` (e.g., `eyJh...`).
   - *CRITICAL:* Never copy or expose the `service_role` key to `.env.local` or any client-side file.

---

## 3. Configuring Local Environment Variables

1. Copy the example configuration template:
   ```bash
   cp .env.local.example .env.local
   ```
2. Open `.env.local` in your editor and paste the values obtained in Step B:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
   ```
3. Verify that `.env.local` is ignored by Git:
   ```bash
   git status --ignored
   ```
   *`.env.local` must show under Ignored files and must never appear in staged commits.*

---

## 4. Applying Database Migrations with Supabase CLI

### Local Supabase Development (Optional Emulator)
To test and develop with a local Postgres instance:
```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Initialize and start local emulator
supabase init
supabase start
```

### Linking and Pushing Migrations to Remote Supabase
1. Link your repository to your remote Supabase project:
   ```bash
   npx supabase link --project-ref your-project-ref
   ```
2. Push the Phase 3 initial schema migration:
   ```bash
   npx supabase db push
   ```
   This will execute `supabase/migrations/20250101000000_initial_schema.sql`, provisioning all tables, indexes, triggers, and Row-Level Security policies.

### Administrator Bootstrap & Initial Provisioning
After executing `npx supabase db push`:
1. Follow [supabase/BOOTSTRAP_ADMIN.md](./BOOTSTRAP_ADMIN.md) to create your administrator user in Supabase Auth.
2. Execute [supabase/bootstrap_admin.sql](./bootstrap_admin.sql) in the Supabase SQL Editor to promote the user to `role = 'admin'`.

### Generating TypeScript Database Types
Once your remote schema is applied:
```bash
npx supabase gen types typescript --project-id your-project-ref > src/types/database.ts
```

---

## 5. Running the Application Locally

Start the Next.js development server:
```bash
npm run dev
```
- Public website: [http://localhost:3000](http://localhost:3000)
- Admin portal: [http://localhost:3000/admin](http://localhost:3000/admin)
- Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 6. Verifying Configuration Without Exposing Secrets

To verify that environment variables are correctly recognized without revealing credentials in logs:

1. In development mode, the Next.js Request Proxy (`src/proxy.ts`) automatically validates incoming sessions.
2. If credentials are missing or empty, `isSupabaseConfigured()` returns `false`, allowing the website to continue rendering with local mock data without crashing.
3. When credentials are set in `.env.local`, `isSupabaseConfigured()` returns `true`, and session refreshing activates automatically.

---

## 7. Roadmap: Supabase & CMS Milestones

| Phase / Step | Status | Scope |
|---|---|---|
| **Phase 3, Step 1** | **Completed** | Dependencies installed, client/server/proxy architecture, initial schema migration, storage plan, and documentation. |
| **Phase 3, Step 2** | **Completed** | Full schema & RLS audit, anti-escalation triggers, role helper functions, storage security policies, admin bootstrap guide & script. |
| **Phase 3, Step 3** | *Upcoming* | Real Supabase Auth integration for `/admin/login`, protected server-side route guards, and session redirect flow. |
| **Phase 3, Step 4** | *Upcoming* | CMS data fetching & mutation actions (portfolio CRUD, services editor, equipment inventory, enquiry pipeline). |
| **Phase 3, Step 5** | *Upcoming* | Supabase Storage integration (drag-and-drop media upload, thumbnail generation, aspect ratio validation). |
