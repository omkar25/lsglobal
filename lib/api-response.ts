import { NextResponse } from "next/server";
import { z } from "zod";

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    { success: true, data },
    { status }
  );
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json(
    { success: false, error: message },
    { status }
  );
}

export function validationErrorResponse(error: z.ZodError) {
  const details: Record<string, string[]> = {};

  error.issues.forEach((issue) => {
    const path = issue.path.join(".");
    if (!details[path]) {
      details[path] = [];
    }
    details[path].push(issue.message);
  });

  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      details,
    },
    { status: 400 }
  );
}

export function notFoundResponse(resource: string = "Resource") {
  return NextResponse.json(
    { success: false, error: `${resource} not found` },
    { status: 404 }
  );
}

export function serverErrorResponse(error: unknown) {
  console.error("Server error:", error);

  const message =
    error instanceof Error ? error.message : "Internal server error";

  return NextResponse.json(
    { success: false, error: message },
    { status: 500 }
  );
}
