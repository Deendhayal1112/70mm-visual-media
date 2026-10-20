import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig, isSupabaseConfigured } from "./config";
import type { Database } from "@/types/database";

/**
 * Creates a server-side Supabase client for Server Components, Server Actions,
 * and Route Handlers using the current Next.js asynchronous `cookies()` API.
 *
 * NOTE:
 * - Must be awaited when invoked in server code.
 * - Handles cookie retrieval and mutation in accordance with @supabase/ssr standards.
 */
export async function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "[Supabase Server Client]: Cannot initialize server client because environment variables are missing. " +
        "Please check your .env.local configuration against .env.local.example."
    );
  }

  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseConfig();

  return createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // In Next.js Server Components, cookies cannot be modified during rendering.
          // This can be safely ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}
