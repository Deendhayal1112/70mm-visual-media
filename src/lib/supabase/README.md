# Supabase Client Modules (`src/lib/supabase/`)

This directory provides the type-safe client modules for interacting with Supabase across the Next.js App Router application.

---

## Architecture Modules

- **[config.ts](file:///Users/deendhayalrr/Documents/70mm%20visual%20media%20/70mm%20VM/70mm-visual-media/src/lib/supabase/config.ts):** Environment variable validation. Provides `isSupabaseConfigured()` and `getSupabaseConfig()`. Throws clear, actionable errors when required keys are missing.
- **[client.ts](file:///Users/deendhayalrr/Documents/70mm%20visual%20media%20/70mm%20VM/70mm-visual-media/src/lib/supabase/client.ts):** Browser client factory with singleton caching. Safe for use in Client Components (`"use client"`).
- **[server.ts](file:///Users/deendhayalrr/Documents/70mm%20visual%20media%20/70mm%20VM/70mm-visual-media/src/lib/supabase/server.ts):** Asynchronous server-side client factory. For use in Server Components, Server Actions, and Route Handlers using the Next.js `cookies()` API.
- **[middleware.ts](file:///Users/deendhayalrr/Documents/70mm%20visual%20media%20/70mm%20VM/70mm-visual-media/src/lib/supabase/middleware.ts):** Session refresh helper invoked by the root `src/middleware.ts` to validate auth tokens and maintain cookie sessions.

For complete database schema migrations, storage plans, and setup instructions, see:
- [supabase/README.md](file:///Users/deendhayalrr/Documents/70mm%20visual%20media%20/70mm%20VM/70mm-visual-media/supabase/README.md)
- [supabase/STORAGE.md](file:///Users/deendhayalrr/Documents/70mm%20visual%20media%20/70mm%20VM/70mm-visual-media/supabase/STORAGE.md)
- [supabase/migrations/20250101000000_initial_schema.sql](file:///Users/deendhayalrr/Documents/70mm%20visual%20media%20/70mm%20VM/70mm-visual-media/supabase/migrations/20250101000000_initial_schema.sql)
