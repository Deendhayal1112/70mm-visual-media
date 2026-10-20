# 70MM VISUAL MEDIA

A premium full-service advertising agency and cinematic film production house based in Chennai, Tamil Nadu, serving clients across India.

> **Project Phase:** Phase 1 — Project Foundation, Architecture & Design System  
> **Status:** Completed

---

## 1. Project Overview

**70MM VISUAL MEDIA** manages film projects from script development and creative direction to high-end cinematic production and final post-production delivery.

This Next.js application hosts two connected systems within a unified codebase:
1. **Public Website:** A cinematic, responsive web experience showcasing agency capabilities, equipment standards, and production process.
2. **Admin Panel:** An administrative content-management interface at `/admin` designed for future project publishing, media management, and client brief reviews.

---

## 2. Design System: Wine & Gold

The application strictly implements the approved **Wine & Gold** palette using CSS custom properties and Tailwind CSS theme tokens:

| Token Name | Semantic Role | Value |
|---|---|---|
| Deep Maroon | Main dark background | `#1A0B0B` |
| Wine Red | Secondary dark surfaces & cards | `#3A1414` |
| Warm Brown | Supporting surfaces & borders | `#4A2C2C` |
| Champagne Gold | Accent, badges & CTAs | `#C49A5A` |
| Light Beige | Main light workspace background | `#F7EFE7` |

### Typography System
- **Display Headings:** `Cormorant Garamond` (editorial serif)
- **Body & Navigation:** `Geist Sans` (clean sans-serif)
- **Technical & Markers:** `Geist Mono` (cinematic camera & scene specs)

---

## 3. Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript with strict type checking
- **Styling:** Tailwind CSS with custom CSS variables
- **Icons:** Lucide React
- **Class Utilities:** `clsx` and `tailwind-merge` (`cn` helper)
- **Motion (Prepared for Phase 2):** GSAP & ScrollTrigger
- **Planned Backend:** Supabase (Auth, PostgreSQL, Storage — documented in `src/lib/supabase/README.md`)

---

## 4. Routes Implemented

- `/` — Public cinematic homepage (Hero section + Landmark navigation anchors for Work, Services, Approach, Equipment, BTS, and Contact)
- `/admin` — Private Content Management Dashboard placeholder with Light Beige workspace and Deep Maroon sidebar
- `/admin/login` — Accessible Admin Portal login interface with explicit development prototype security notices
- `404` — Custom cinematic not-found page

---

## 5. Getting Started

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public website, or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

### Build Verification
```bash
npm run build
npm run lint
```

---

## 6. Security Note

- Authentication is currently a development placeholder.
- No credentials or sensitive data are hardcoded or stored in client-side storage.
- Real authentication with Supabase Auth will be integrated in a subsequent backend phase.
