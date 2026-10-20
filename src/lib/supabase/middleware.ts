import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig, isSupabaseConfigured } from "./config";
import type { Database } from "@/types/database";

/**
 * Refreshes auth tokens stored in cookies and passes updated cookies forward.
 *
 * IMPORTANT RULES:
 * 1. Returns cleanly if Supabase environment variables are not yet configured.
 * 2. Does NOT run arbitrary application code between createServerClient and getUser().
 * 3. Uses `supabase.auth.getUser()` instead of `supabase.auth.getSession()` for secure token validation.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  // If Supabase credentials have not been configured yet, proceed normally
  if (!isSupabaseConfigured()) {
    return NextResponse.next({
      request,
    });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const { url, publishableKey } = getSupabaseConfig();

  const supabase = createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Re-validates the token against the Supabase Auth server and refreshes expired sessions
  await supabase.auth.getUser();

  return supabaseResponse;
}
