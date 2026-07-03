import { NextRequest } from "next/server";
import { reviewService } from "@/services";
import { IdParamSchema } from "@/validators/product";
import {
  successResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * POST /api/admin/reviews/[id]/approve
 * Approve a review
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const review = await reviewService.approveReview(id);

    return successResponse(review);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Review not found") {
        return notFoundResponse("Review");
      }
    }
    return serverErrorResponse(error);
  }
}

/**
 * DELETE /api/admin/reviews/[id]/approve
 * Reject a review (unapprove)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const review = await reviewService.rejectReview(id);

    return successResponse(review);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Review not found") {
        return notFoundResponse("Review");
      }
    }
    return serverErrorResponse(error);
  }
}
