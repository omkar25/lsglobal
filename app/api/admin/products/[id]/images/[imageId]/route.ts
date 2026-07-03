import { NextRequest } from "next/server";
import { productService } from "@/services";
import { UpdateProductImageSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ id: string; imageId: string }> };

/**
 * PATCH /api/admin/products/[id]/images/[imageId]
 * Update a product image
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { imageId } = await params;
    const body = await request.json();

    const parseResult = UpdateProductImageSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const image = await productService.updateProductImage(imageId, {
      url: parseResult.data.url,
      alt: parseResult.data.alt ?? undefined,
      isPrimary: parseResult.data.isPrimary,
    });

    return successResponse(image);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Image not found") {
        return notFoundResponse("Image");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}

/**
 * DELETE /api/admin/products/[id]/images/[imageId]
 * Delete a product image
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { imageId } = await params;

    await productService.deleteProductImage(imageId);

    return successResponse({ message: "Image deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Image not found") {
        return notFoundResponse("Image");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
