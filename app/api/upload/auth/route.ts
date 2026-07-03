import { NextRequest } from "next/server";
import { getImageKitAuthParams } from "@/lib/imagekit";
import { successResponse, serverErrorResponse } from "@/lib/api-response";

/**
 * GET /api/upload/auth
 * Get ImageKit authentication parameters for client-side uploads
 */
export async function GET(request: NextRequest) {
  try {
    const authParams = getImageKitAuthParams();
    return successResponse(authParams);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
