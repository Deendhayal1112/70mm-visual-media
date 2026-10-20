import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig, isSupabaseConfigured } from "./config";
import type { Database } from "@/types/database";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Creates or retrieves the singleton Supabase client for browser (client-side) code.
 *
 * NOTE:
 * - Safe for Client Components (`"use client"`).
 * - Never contains server-only secrets.
 * - Reuses the client instance in browser memory to avoid client churn.
 */
export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "[Supabase Browser Client]: Cannot initialize browser client because environment variables are missing. " +
        "Please check your .env.local configuration against .env.local.example."
    );
  }

  if (typeof window !== "undefined" && browserClient) {
    return browserClient;
  }

  const { url, publishableKey } = getSupabaseConfig();
  const client = createBrowserClient<Database>(url, publishableKey);

  if (typeof window !== "undefined") {
    browserClient = client;
  }

  return client;
}
