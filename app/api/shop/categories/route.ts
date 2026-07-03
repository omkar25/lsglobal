import { NextRequest } from "next/server";
import { categoryService } from "@/services";
import {
  successResponse,
  serverErrorResponse,
} from "@/lib/api-response";

/**
 * GET /api/shop/categories
 * Get active categories for the shop
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tree = searchParams.get("tree") === "true";

    if (tree) {
      const categories = await categoryService.getCategoryTree(true);
      return successResponse(categories);
    }

    const categories = await categoryService.getAllCategories(true);
    return successResponse(categories);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
