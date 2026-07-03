import { NextRequest } from "next/server";
import { categoryService } from "@/services";
import { UpdateCategorySchema, IdParamSchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/categories/[id]
 * Get a single category by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const category = await categoryService.getCategoryById(id);
    if (!category) {
      return notFoundResponse("Category");
    }

    return successResponse(category);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * PATCH /api/admin/categories/[id]
 * Update a category
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const idParseResult = IdParamSchema.safeParse({ id });
    if (!idParseResult.success) {
      return validationErrorResponse(idParseResult.error);
    }

    const parseResult = UpdateCategorySchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const category = await categoryService.updateCategory(id, parseResult.data);

    return successResponse(category);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Category not found") {
        return notFoundResponse("Category");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}

/**
 * PUT /api/admin/categories/[id]
 * Update a category (alias for PATCH)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  return PATCH(request, { params });
}

/**
 * DELETE /api/admin/categories/[id]
 * Delete a category
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const parseResult = IdParamSchema.safeParse({ id });
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    await categoryService.deleteCategory(id);

    return successResponse({ message: "Category deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Category not found") {
        return notFoundResponse("Category");
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
