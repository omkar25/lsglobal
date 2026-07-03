import { NextRequest } from "next/server";
import { productService } from "@/services";
import { productImageRepository } from "@/repositories";
import { CreateProductImageSchema, IdParamSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/products/[id]/images
 * Get all images for a product
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const images = await productImageRepository.findByProductId(id);

    return successResponse(images);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/admin/products/[id]/images
 * Add a new image to a product
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const idParseResult = IdParamSchema.safeParse({ id });
    if (!idParseResult.success) {
      return validationErrorResponse(idParseResult.error);
    }

    const parseResult = CreateProductImageSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const image = await productService.addProductImage(id, {
      url: parseResult.data.url,
      alt: parseResult.data.alt ?? undefined,
      isPrimary: parseResult.data.isPrimary,
    });

    return successResponse(image, 201);
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
