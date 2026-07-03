import { brandService } from "@/services";
import {
  successResponse,
  serverErrorResponse,
} from "@/lib/api-response";

/**
 * GET /api/shop/brands
 * Get brands that have published products
 */
export async function GET() {
  try {
    const brands = await brandService.getBrandsWithProducts();
    return successResponse(brands);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
