import { z } from "zod";
import crypto from "crypto";

// ============================================
// VALIDATION SCHEMAS
// ============================================

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password is too long"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Verify admin credentials against environment variables
 * Never expose credentials to the client
 */
export function verifyCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error("Admin credentials not configured in environment variables");
    return false;
  }

  // Use timing-safe comparison to prevent timing attacks
  const usernameMatch = timingSafeEqual(username, adminUsername);
  const passwordMatch = timingSafeEqual(password, adminPassword);

  return usernameMatch && passwordMatch;
}

/**
 * Timing-safe string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Still perform comparison to maintain constant time
    crypto.timingSafeEqual(Buffer.from(a), Buffer.from(a));
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Generate a secure random session ID
 */
export function generateSessionId(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Hash a value using SHA-256
 */
export function hashValue(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}
