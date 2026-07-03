import { NextRequest } from "next/server";
import { productService } from "@/services";
import { productFeatureRepository } from "@/repositories";
import { CreateProductFeatureSchema, IdParamSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/products/[id]/features
 * Get all features for a product
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const features = await productFeatureRepository.findByProductId(id);

    return successResponse(features);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/admin/products/[id]/features
 * Add a new feature to a product
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const idParseResult = IdParamSchema.safeParse({ id });
    if (!idParseResult.success) {
      return validationErrorResponse(idParseResult.error);
    }

    const parseResult = CreateProductFeatureSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const feature = await productService.addProductFeature(id, parseResult.data);

    return successResponse(feature, 201);
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
 * PUT /api/admin/products/[id]/features
 * Bulk update all features for a product
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const idParseResult = IdParamSchema.safeParse({ id });
    if (!idParseResult.success) {
      return validationErrorResponse(idParseResult.error);
    }

    const BulkFeaturesSchema = z.array(CreateProductFeatureSchema);
    const parseResult = BulkFeaturesSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    await productService.bulkUpdateProductFeatures(id, parseResult.data);
    const features = await productFeatureRepository.findByProductId(id);

    return successResponse(features);
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
