import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * Next.js 16 Proxy Convention
 * Replaces deprecated middleware.ts convention to intercept incoming requests,
 * refresh Supabase auth session cookies, and handle request routing boundaries.
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images directory)
     * - icons/ (public icons directory)
     * - videos/ (public videos directory)
     * - common static asset extensions (.svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|icons/|videos/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
