import { NextRequest } from "next/server";
import { brandService } from "@/services";
import { UpdateBrandSchema, IdParamSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/brands/[id]
 * Get a single brand by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const brand = await brandService.getBrandById(id);
    if (!brand) {
      return notFoundResponse("Brand");
    }

    return successResponse(brand);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * PATCH /api/admin/brands/[id]
 * Update a brand
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const idParseResult = IdParamSchema.safeParse({ id });
    if (!idParseResult.success) {
      return validationErrorResponse(idParseResult.error);
    }

    const parseResult = UpdateBrandSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const brand = await brandService.updateBrand(id, parseResult.data);

    return successResponse(brand);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Brand not found") {
        return notFoundResponse("Brand");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}

/**
 * PUT /api/admin/brands/[id]
 * Update a brand (alias for PATCH)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  return PATCH(request, { params });
}

/**
 * DELETE /api/admin/brands/[id]
 * Delete a brand
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    await brandService.deleteBrand(id);

    return successResponse({ message: "Brand deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Brand not found") {
        return notFoundResponse("Brand");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
