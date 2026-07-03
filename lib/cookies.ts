import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_COOKIE_MAX_AGE = 60 * 60; // 1 hour in seconds

// ============================================
// COOKIE MANAGEMENT
// ============================================

/**
 * Set the session cookie with secure options
 */
export async function setSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();

  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: "/",
  });
}

/**
 * Get the session cookie value
 */
export async function getSessionCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  return cookie?.value || null;
}

/**
 * Delete the session cookie
 */
export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

/**
 * Check if session cookie exists (for middleware - sync version)
 */
export function getSessionCookieFromRequest(
  request: Request
): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  return cookies[SESSION_COOKIE_NAME] || null;
}
