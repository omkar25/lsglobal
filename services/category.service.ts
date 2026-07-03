import { generateUniqueCategorySlug } from "@/lib/slug";
import { categoryRepository } from "@/repositories";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/validators/product";

// ============================================
// CATEGORY SERVICE
// ============================================

export class CategoryService {
  /**
   * Create a new category
   */
  async createCategory(input: CreateCategoryInput) {
    const slug = await generateUniqueCategorySlug(input.name);

    if (input.parentId) {
      const parentExists = await categoryRepository.exists(input.parentId);
      if (!parentExists) {
        throw new Error("Parent category not found");
      }
    }

    return categoryRepository.create({
      name: input.name,
      slug,
      description: input.description,
      image: input.image,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true,
      ...(input.parentId && { parent: { connect: { id: input.parentId } } }),
    });
  }

  /**
   * Update an existing category
   */
  async updateCategory(id: string, input: UpdateCategoryInput) {
    const existingCategory = await categoryRepository.findById(id);
    if (!existingCategory) {
      throw new Error("Category not found");
    }

    let slug = existingCategory.slug;
    if (input.name && input.name !== existingCategory.name) {
      slug = await generateUniqueCategorySlug(input.name, id);
    }

    if (input.parentId) {
      if (input.parentId === id) {
        throw new Error("Category cannot be its own parent");
      }
      const parentExists = await categoryRepository.exists(input.parentId);
      if (!parentExists) {
        throw new Error("Parent category not found");
      }
    }

    // Destructure to exclude parentId from direct update
    const { parentId, ...updateData } = input;

    return categoryRepository.update(id, {
      ...updateData,
      slug,
      ...(parentId === null && { parent: { disconnect: true } }),
      ...(parentId && { parent: { connect: { id: parentId } } }),
    });
  }

  /**
   * Delete a category
   */
  async deleteCategory(id: string) {
    const exists = await categoryRepository.exists(id);
    if (!exists) {
      throw new Error("Category not found");
    }

    return categoryRepository.delete(id);
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: string) {
    return categoryRepository.findById(id);
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug: string) {
    return categoryRepository.findBySlug(slug);
  }

  /**
   * Get all categories
   */
  async getAllCategories(activeOnly: boolean = false) {
    return categoryRepository.findAll(activeOnly);
  }

  /**
   * Get root categories with children (tree structure)
   */
  async getCategoryTree(activeOnly: boolean = false) {
    return categoryRepository.findRootCategories(activeOnly);
  }

  /**
   * Get children of a category
   */
  async getCategoryChildren(parentId: string, activeOnly: boolean = false) {
    return categoryRepository.findChildren(parentId, activeOnly);
  }

  /**
   * Get category breadcrumb
   */
  async getCategoryBreadcrumb(categoryId: string) {
    return categoryRepository.getBreadcrumb(categoryId);
  }

  /**
   * Get category count
   */
  async getCategoryCount(activeOnly: boolean = false) {
    return categoryRepository.count(activeOnly);
  }
}

export const categoryService = new CategoryService();
