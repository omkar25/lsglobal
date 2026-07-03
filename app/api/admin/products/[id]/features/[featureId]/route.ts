import { NextRequest } from "next/server";
import { productService } from "@/services";
import { UpdateProductFeatureSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ id: string; featureId: string }> };

/**
 * PATCH /api/admin/products/[id]/features/[featureId]
 * Update a product feature
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { featureId } = await params;
    const body = await request.json();

    const parseResult = UpdateProductFeatureSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const feature = await productService.updateProductFeature(featureId, parseResult.data);

    return successResponse(feature);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Feature not found") {
        return notFoundResponse("Feature");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}

/**
 * DELETE /api/admin/products/[id]/features/[featureId]
 * Delete a product feature
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { featureId } = await params;

    await productService.deleteProductFeature(featureId);

    return successResponse({ message: "Feature deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Feature not found") {
        return notFoundResponse("Feature");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
