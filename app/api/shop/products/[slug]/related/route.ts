import { NextRequest } from "next/server";
import { productService } from "@/services";
import { SlugParamSchema } from "@/validators/product";
import {
  successResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ slug: string }> };

/**
 * GET /api/shop/products/[slug]/related
 * Get related products for a product
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "4", 10);

    const parseResult = SlugParamSchema.safeParse({ slug });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const product = await productService.getProductBySlug(slug);
    if (!product || !product.isPublished) {
      return notFoundResponse("Product");
    }

    const relatedProducts = await productService.getRelatedProducts(product.id, limit);

    return successResponse(relatedProducts);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
