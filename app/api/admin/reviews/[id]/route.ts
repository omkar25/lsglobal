import { NextRequest } from "next/server";
import { reviewService } from "@/services";
import { IdParamSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/reviews/[id]
 * Get a single review by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const review = await reviewService.getReviewById(id);
    if (!review) {
      return notFoundResponse("Review");
    }

    return successResponse(review);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * DELETE /api/admin/reviews/[id]
 * Delete a review
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    await reviewService.deleteReview(id);

    return successResponse({ message: "Review deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Review not found") {
        return notFoundResponse("Review");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
