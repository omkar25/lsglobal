import { NextResponse } from "next/server";
import { destroySession } from "@/lib/session";

/**
 * POST /api/admin/logout
 * API route for admin logout
 */
export async function POST() {
  try {
    await destroySession();

    return NextResponse.json(
      {
        success: true,
        message: "Logout successful",
        redirectTo: "/admin/login",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
