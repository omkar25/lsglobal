"use server";

import { redirect } from "next/navigation";
import { LoginSchema, verifyCredentials } from "@/lib/auth";
import { createSession, destroySession, getSessionInfo, refreshSession } from "@/lib/session";

export type LoginResult = {
  success: boolean;
  error?: string;
};

/**
 * Server action to handle admin login
 */
export async function loginAction(
  prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const username = formData.get("username");
  const password = formData.get("password");

  // Validate input
  const parseResult = LoginSchema.safeParse({ username, password });

  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;
    const errorMessage =
      errors.username?.[0] || errors.password?.[0] || "Invalid input";
    return { success: false, error: errorMessage };
  }

  // Verify credentials
  const isValid = verifyCredentials(
    parseResult.data.username,
    parseResult.data.password
  );

  if (!isValid) {
    // Add a small delay to prevent brute force attacks
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: false, error: "Invalid username or password" };
  }

  // Create session
  await createSession(parseResult.data.username);

  // Return success - client will handle redirect
  return { success: true };
}

/**
 * Server action to handle admin logout
 */
export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

/**
 * Get current session info and refresh session
 * This is a Server Action so it can modify cookies
 */
export async function getAuthStatus(): Promise<{
  isAuthenticated: boolean;
  username?: string;
  expiresIn?: number;
}> {
  const session = await getSessionInfo();

  if (!session) {
    return { isAuthenticated: false };
  }

  // Refresh the session cookie (this is safe in a Server Action)
  await refreshSession();

  return {
    isAuthenticated: true,
    username: session.username,
    expiresIn: session.expiresIn,
  };
}
