import { NextRequest } from "next/server";
import { productService } from "@/services";
import { UpdateProductSchema, IdParamSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/products/[id]
 * Get a single product by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const product = await productService.getProductById(id);
    if (!product) {
      return notFoundResponse("Product");
    }

    return successResponse(product);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * PATCH /api/admin/products/[id]
 * Update a product
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const idParseResult = IdParamSchema.safeParse({ id });
    if (!idParseResult.success) {
      return validationErrorResponse(idParseResult.error);
    }

    const parseResult = UpdateProductSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const product = await productService.updateProduct(id, parseResult.data);

    return successResponse(product);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Product not found") {
        return notFoundResponse("Product");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}

/**
 * DELETE /api/admin/products/[id]
 * Delete a product
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    await productService.deleteProduct(id);

    return successResponse({ message: "Product deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Product not found") {
        return notFoundResponse("Product");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
