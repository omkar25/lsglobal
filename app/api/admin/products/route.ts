import { NextRequest } from "next/server";
import { productService } from "@/services";
import {
  CreateProductSchema,
  ProductQueryParamsSchema,
} from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  serverErrorResponse,
} from "@/lib/api-response";

/**
 * GET /api/admin/products
 * Get paginated list of products with filters
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

    const result = await productService.getProducts(filters, page, limit, sortBy);

    return successResponse(result);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/admin/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parseResult = CreateProductSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const product = await productService.createProduct(parseResult.data);

    return successResponse(product, 201);
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
