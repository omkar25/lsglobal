import { NextRequest } from "next/server";
import { reviewService } from "@/services";
import {
  successResponse,
  serverErrorResponse,
} from "@/lib/api-response";

/**
 * GET /api/admin/reviews
 * Get all reviews with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const isApproved = searchParams.get("isApproved");
    const productId = searchParams.get("productId");

    const filters: { isApproved?: boolean; productId?: string } = {};

    if (isApproved !== null) {
      filters.isApproved = isApproved === "true";
    }

    if (productId) {
      filters.productId = productId;
    }

    const result = await reviewService.getAllReviews(page, limit, filters);

    return successResponse(result);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
