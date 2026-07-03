"use server";

import { revalidatePath } from "next/cache";
import { productService, categoryService, brandService, reviewService } from "@/services";
import {
  CreateProductSchema,
  UpdateProductSchema,
  CreateCategorySchema,
  UpdateCategorySchema,
  CreateBrandSchema,
  UpdateBrandSchema,
} from "@/validators/product";
import type { CreateProductInput, UpdateProductInput } from "@/validators/product";

// ============================================
// PRODUCT ACTIONS
// ============================================

export async function createProductAction(data: CreateProductInput) {
  try {
    const parseResult = CreateProductSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      };
    }

    const product = await productService.createProduct(parseResult.data);

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true, data: product };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

export async function updateProductAction(id: string, data: UpdateProductInput) {
  try {
    const parseResult = UpdateProductSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      };
    }

    const product = await productService.updateProduct(id, parseResult.data);

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    revalidatePath("/products");

    return { success: true, data: product };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await productService.deleteProduct(id);

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

export async function publishProductAction(id: string) {
  try {
    await productService.publishProduct(id);

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to publish product",
    };
  }
}

export async function unpublishProductAction(id: string) {
  try {
    await productService.unpublishProduct(id);

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to unpublish product",
    };
  }
}

// ============================================
// PRODUCT IMAGE ACTIONS
// ============================================

export async function addProductImageAction(
  productId: string,
  data: { url: string; alt?: string; isPrimary?: boolean }
) {
  try {
    const image = await productService.addProductImage(productId, data);

    revalidatePath(`/admin/products/${productId}`);

    return { success: true, data: image };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add image",
    };
  }
}

export async function deleteProductImageAction(imageId: string, productId: string) {
  try {
    await productService.deleteProductImage(imageId);

    revalidatePath(`/admin/products/${productId}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete image",
    };
  }
}

// ============================================
// PRODUCT FEATURE ACTIONS
// ============================================

export async function addProductFeatureAction(
  productId: string,
  data: { title: string; value: string }
) {
  try {
    const feature = await productService.addProductFeature(productId, data);

    revalidatePath(`/admin/products/${productId}`);

    return { success: true, data: feature };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add feature",
    };
  }
}

export async function deleteProductFeatureAction(featureId: string, productId: string) {
  try {
    await productService.deleteProductFeature(featureId);

    revalidatePath(`/admin/products/${productId}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete feature",
    };
  }
}

export async function bulkUpdateProductFeaturesAction(
  productId: string,
  features: { title: string; value: string; sortOrder?: number }[]
) {
  try {
    await productService.bulkUpdateProductFeatures(productId, features);

    revalidatePath(`/admin/products/${productId}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update features",
    };
  }
}

// ============================================
// CATEGORY ACTIONS
// ============================================

export async function createCategoryAction(data: unknown) {
  try {
    const parseResult = CreateCategorySchema.safeParse(data);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      };
    }

    const category = await categoryService.createCategory(parseResult.data);

    revalidatePath("/admin/categories");

    return { success: true, data: category };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create category",
    };
  }
}

export async function updateCategoryAction(id: string, data: unknown) {
  try {
    const parseResult = UpdateCategorySchema.safeParse(data);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      };
    }

    const category = await categoryService.updateCategory(id, parseResult.data);

    revalidatePath("/admin/categories");

    return { success: true, data: category };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update category",
    };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await categoryService.deleteCategory(id);

    revalidatePath("/admin/categories");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete category",
    };
  }
}

// ============================================
// BRAND ACTIONS
// ============================================

export async function createBrandAction(data: unknown) {
  try {
    const parseResult = CreateBrandSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      };
    }

    const brand = await brandService.createBrand(parseResult.data);

    revalidatePath("/admin/brands");

    return { success: true, data: brand };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create brand",
    };
  }
}

export async function updateBrandAction(id: string, data: unknown) {
  try {
    const parseResult = UpdateBrandSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        success: false,
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      };
    }

    const brand = await brandService.updateBrand(id, parseResult.data);

    revalidatePath("/admin/brands");

    return { success: true, data: brand };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update brand",
    };
  }
}

export async function deleteBrandAction(id: string) {
  try {
    await brandService.deleteBrand(id);

    revalidatePath("/admin/brands");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete brand",
    };
  }
}

// ============================================
// REVIEW ACTIONS
// ============================================

export async function approveReviewAction(id: string) {
  try {
    await reviewService.approveReview(id);

    revalidatePath("/admin/reviews");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to approve review",
    };
  }
}

export async function rejectReviewAction(id: string) {
  try {
    await reviewService.rejectReview(id);

    revalidatePath("/admin/reviews");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to reject review",
    };
  }
}

export async function deleteReviewAction(id: string) {
  try {
    await reviewService.deleteReview(id);

    revalidatePath("/admin/reviews");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete review",
    };
  }
}
