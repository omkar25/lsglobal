import { NextRequest } from "next/server";
import { categoryService } from "@/services";
import { CreateCategorySchema } from "@/validators/product";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  serverErrorResponse,
} from "@/lib/api-response";

/**
 * GET /api/admin/categories
 * Get all categories
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tree = searchParams.get("tree") === "true";
    const activeOnly = searchParams.get("activeOnly") === "true";

    if (tree) {
      const categories = await categoryService.getCategoryTree(activeOnly);
      return successResponse(categories);
    }

    const categories = await categoryService.getAllCategories(activeOnly);
    return successResponse(categories);
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/admin/categories
 * Create a new category
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parseResult = CreateCategorySchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const category = await categoryService.createCategory(parseResult.data);

    return successResponse(category, 201);
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
