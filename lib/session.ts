import { generateSessionId, hashValue } from "./auth";
import { setSessionCookie, getSessionCookie, deleteSessionCookie } from "./cookies";

// Session timeout in milliseconds (1 hour)
const SESSION_TIMEOUT_MS = 60 * 60 * 1000;

// In-memory session store (for single admin, this is sufficient)
// For production with multiple servers, use Redis or database
interface SessionData {
  sessionId: string;
  username: string;
  createdAt: number;
  lastActivity: number;
}

const sessions = new Map<string, SessionData>();

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Create a new session for the admin user
 * Returns the session ID to be stored in cookie
 * NOTE: Can only be called from Server Actions or Route Handlers
 */
export async function createSession(username: string): Promise<string> {
  // Generate a new session ID
  const sessionId = generateSessionId();
  const hashedSessionId = hashValue(sessionId);

  const now = Date.now();

  // Store session data
  const sessionData: SessionData = {
    sessionId: hashedSessionId,
    username,
    createdAt: now,
    lastActivity: now,
  };

  // Clear any existing sessions (single admin)
  sessions.clear();

  // Store the new session
  sessions.set(hashedSessionId, sessionData);

  // Set the session cookie
  await setSessionCookie(sessionId);

  return sessionId;
}

/**
 * Validate session without modifying cookies (safe for Server Components)
 * Returns the session data if valid, null otherwise
 */
export async function validateSession(): Promise<SessionData | null> {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return null;
  }

  const hashedSessionId = hashValue(sessionId);
  const sessionData = sessions.get(hashedSessionId);

  if (!sessionData) {
    return null;
  }

  const now = Date.now();
  const timeSinceLastActivity = now - sessionData.lastActivity;

  // Check if session has expired due to inactivity
  if (timeSinceLastActivity > SESSION_TIMEOUT_MS) {
    return null;
  }

  // Update activity timestamp in memory (but don't write cookie here)
  sessionData.lastActivity = now;
  sessions.set(hashedSessionId, sessionData);

  return sessionData;
}

/**
 * Refresh session - updates cookie expiration
 * NOTE: Can only be called from Server Actions or Route Handlers
 */
export async function refreshSession(): Promise<boolean> {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return false;
  }

  const hashedSessionId = hashValue(sessionId);
  const sessionData = sessions.get(hashedSessionId);

  if (!sessionData) {
    await deleteSessionCookie();
    return false;
  }

  const now = Date.now();
  const timeSinceLastActivity = now - sessionData.lastActivity;

  if (timeSinceLastActivity > SESSION_TIMEOUT_MS) {
    await destroySession();
    return false;
  }

  // Refresh the session
  sessionData.lastActivity = now;
  sessions.set(hashedSessionId, sessionData);
  await setSessionCookie(sessionId);

  return true;
}

/**
 * Destroy the current session
 */
export async function destroySession(): Promise<void> {
  const sessionId = await getSessionCookie();

  if (sessionId) {
    const hashedSessionId = hashValue(sessionId);
    sessions.delete(hashedSessionId);
  }

  await deleteSessionCookie();
}

/**
 * Get session info without refreshing
 * Used for checking auth status without extending session
 */
export async function getSessionInfo(): Promise<{ username: string; expiresIn: number } | null> {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return null;
  }

  const hashedSessionId = hashValue(sessionId);
  const sessionData = sessions.get(hashedSessionId);

  if (!sessionData) {
    return null;
  }

  const now = Date.now();
  const timeSinceLastActivity = now - sessionData.lastActivity;

  if (timeSinceLastActivity > SESSION_TIMEOUT_MS) {
    return null;
  }

  const expiresIn = Math.max(0, SESSION_TIMEOUT_MS - timeSinceLastActivity);

  return {
    username: sessionData.username,
    expiresIn,
  };
}

/**
 * Check if there's a valid session (for middleware)
 */
export async function hasValidSession(): Promise<boolean> {
  const session = await validateSession();
  return session !== null;
}
