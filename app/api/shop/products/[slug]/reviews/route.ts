import { NextRequest } from "next/server";
import { productService, reviewService } from "@/services";
import { CreateProductReviewSchema, SlugParamSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ slug: string }> };

/**
 * GET /api/shop/products/[slug]/reviews
 * Get approved reviews for a product
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const parseResult = SlugParamSchema.safeParse({ slug });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const product = await productService.getProductBySlug(slug);
    if (!product || !product.isPublished) {
      return notFoundResponse("Product");
    }

    const reviews = await reviewService.getProductReviews(product.id, true);
    const averageRating = await reviewService.getProductAverageRating(product.id);
    const ratingDistribution = await reviewService.getProductRatingDistribution(product.id);

    return successResponse({
      reviews,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviews.length,
      ratingDistribution,
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/shop/products/[slug]/reviews
 * Submit a new review for a product
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const slugParseResult = SlugParamSchema.safeParse({ slug });
    if (!slugParseResult.success) {
      return validationErrorResponse(slugParseResult.error);
    }

    const product = await productService.getProductBySlug(slug);
    if (!product || !product.isPublished) {
      return notFoundResponse("Product");
    }

    const parseResult = CreateProductReviewSchema.safeParse({
      ...body,
      productId: product.id,
    });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const review = await reviewService.createReview(parseResult.data);

    return successResponse(
      {
        ...review,
        message: "Review submitted successfully. It will be visible after approval.",
      },
      201
    );
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
