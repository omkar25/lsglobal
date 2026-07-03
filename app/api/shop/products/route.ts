import { NextRequest } from "next/server";
import { productService } from "@/services";
import { ProductQueryParamsSchema } from "@/validators/product";
import {
  successResponse,
  validationErrorResponse,
  serverErrorResponse,
} from "@/lib/api-response";

/**
 * GET /api/shop/products
 * Get published products for the shop
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const parseResult = ProductQueryParamsSchema.safeParse(params);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const { page, limit, sortBy, ...filters } = parseResult.data;

    // Force isPublished to true for public shop
    const result = await productService.getProducts(
      { ...filters, isPublished: true },
      page,
      limit,
      sortBy
    );

    return successResponse(result);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
