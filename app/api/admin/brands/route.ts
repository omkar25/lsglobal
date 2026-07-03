import { NextRequest } from "next/server";
import { brandService } from "@/services";
import { CreateBrandSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  serverErrorResponse,
} from "@/lib/api-response";

/**
 * GET /api/admin/brands
 * Get all brands
 */
export async function GET() {
  try {
    const brands = await brandService.getAllBrands();
    return successResponse(brands);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/admin/brands
 * Create a new brand
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parseResult = CreateBrandSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const brand = await brandService.createBrand(parseResult.data);

    return successResponse(brand, 201);
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
