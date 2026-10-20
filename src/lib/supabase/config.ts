/**
 * Safe Supabase Configuration & Validation Helper
 *
 * This module inspects and validates required public environment variables.
 * Browser code must only access `NEXT_PUBLIC_` prefixed keys.
 * Privileged keys (like service_role) must NEVER be exposed here.
 */

export interface SupabaseConfig {
  url: string;
  publishableKey: string;
}

/**
 * Checks whether Supabase environment variables are present and non-empty.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();

  return Boolean(url && key);
}

/**
 * Returns validated Supabase configuration.
 * Throws a descriptive, actionable error if configuration is missing.
 */
export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();

  if (!url || !publishableKey) {
    const missing: string[] = [];
    if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
    if (!publishableKey) {
      missing.push(
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or legacy NEXT_PUBLIC_SUPABASE_ANON_KEY)"
      );
    }

    throw new Error(
      `[Supabase Configuration Error]: Missing required environment variable(s): ${missing.join(
        ", "
      )}.\n` +
        `Please copy .env.local.example to .env.local and populate the credentials from your Supabase Project Dashboard.\n` +
        `Refer to supabase/README.md for setup instructions.`
    );
  }

  return { url, publishableKey };
}
