import { NextRequest } from "next/server";
import { productService } from "@/services";
import {
  successResponse,
  serverErrorResponse,
} from "@/lib/api-response";

/**
 * GET /api/shop/products/featured
 * Get featured products
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "8", 10);

    const products = await productService.getFeaturedProducts(limit);

    return successResponse(products);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
