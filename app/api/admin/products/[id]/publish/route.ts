import { NextRequest } from "next/server";
import { productService } from "@/services";
import { IdParamSchema } from "@/validators/product";
import {
  successResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * POST /api/admin/products/[id]/publish
 * Publish a product
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const product = await productService.publishProduct(id);

    return successResponse(product);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Product not found") {
        return notFoundResponse("Product");
      }
    }
    return serverErrorResponse(error);
  }
}

/**
 * DELETE /api/admin/products/[id]/publish
 * Unpublish a product
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const product = await productService.unpublishProduct(id);

    return successResponse(product);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Product not found") {
        return notFoundResponse("Product");
      }
    }
    return serverErrorResponse(error);
  }
}
