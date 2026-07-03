import { NextRequest, NextResponse } from "next/server";
import { LoginSchema, verifyCredentials } from "@/lib/auth";
import { createSession } from "@/lib/session";

/**
 * POST /api/admin/login
 * API route for admin login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parseResult = LoginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Verify credentials
    const isValid = verifyCredentials(
      parseResult.data.username,
      parseResult.data.password
    );

    if (!isValid) {
      // Add a small delay to prevent brute force attacks
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return NextResponse.json(
        {
          success: false,
          error: "Invalid username or password",
        },
        { status: 401 }
      );
    }

    // Create session
    await createSession(parseResult.data.username);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        redirectTo: "/admin",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
