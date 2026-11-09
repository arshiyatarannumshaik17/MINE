import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { normalizeUniverseId } from "./lib/types";

/**
 * Edge-compatible session payload decoder
 */
function decodeSessionPayload(token: string): { sub: string; exp: number } | null {
  try {
    const [payloadStr, sig] = token.split(".");
    if (!payloadStr || !sig) return null;
    const base64 = payloadStr.replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = atob(base64);
    const data = JSON.parse(jsonStr);
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return data;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /universe/:slug routes against IDOR and unauthorized visits
  if (pathname.startsWith("/universe/")) {
    const segments = pathname.split("/").filter(Boolean);
    const targetSlug = segments[1]; // e.g. "abbu", "afrid", "sameer"

    if (!targetSlug) {
      return NextResponse.redirect(new URL("/portal", req.url));
    }

    const sessionCookie = req.cookies.get("universe_session")?.value;

    if (!sessionCookie) {
      // No session -> redirect to portal
      const portalUrl = new URL("/portal", req.url);
      portalUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(portalUrl);
    }

    const session = decodeSessionPayload(sessionCookie);

    if (!session || !session.sub) {
      // Invalid or expired session token -> redirect to portal
      const portalUrl = new URL("/portal", req.url);
      return NextResponse.redirect(portalUrl);
    }

    // STRICT IDOR DEFENSE:
    // If the authenticated session does NOT match the requested URL slug,
    // force redirect back to the recipient's own universe!
    const normalizedAuth = normalizeUniverseId(session.sub);
    const normalizedTarget = normalizeUniverseId(targetSlug);

    if (normalizedAuth !== normalizedTarget) {
      // Prevent cross-recipient access attempt
      return NextResponse.redirect(new URL(`/universe/${normalizedAuth}`, req.url));
    }
  }

  // Protect /admin routes (except /admin/login)
  if (pathname === "/admin" || (pathname.startsWith("/admin/") && pathname !== "/admin/login")) {
    const adminSession = req.cookies.get("admin_session")?.value;
    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/universe/:path*", "/admin", "/admin/:path*"],
};
