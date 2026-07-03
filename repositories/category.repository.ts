import prisma from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma";

// ============================================
// CATEGORY REPOSITORY
// ============================================

export class CategoryRepository {
  /**
   * Create a new category
   */
  async create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({
      data,
      include: { parent: true, children: true },
    });
  }

  /**
   * Find category by ID
   */
  async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: {
          orderBy: { sortOrder: "asc" },
        },
        _count: { select: { products: true } },
      },
    });
  }

  /**
   * Find category by slug
   */
  async findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: { slug },
      include: {
        parent: true,
        children: {
          orderBy: { sortOrder: "asc" },
        },
        _count: { select: { products: true } },
      },
    });
  }

  /**
   * Find all categories
   */
  async findAll(activeOnly: boolean = false) {
    return prisma.category.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { sortOrder: "asc" },
      include: {
        parent: true,
        _count: { select: { products: true } },
      },
    });
  }

  /**
   * Find root categories (no parent)
   */
  async findRootCategories(activeOnly: boolean = false) {
    return prisma.category.findMany({
      where: {
        parentId: null,
        ...(activeOnly && { isActive: true }),
      },
      orderBy: { sortOrder: "asc" },
      include: {
        children: {
          where: activeOnly ? { isActive: true } : undefined,
          orderBy: { sortOrder: "asc" },
          include: {
            children: {
              where: activeOnly ? { isActive: true } : undefined,
              orderBy: { sortOrder: "asc" },
            },
          },
        },
        _count: { select: { products: true } },
      },
    });
  }

  /**
   * Find children of a category
   */
  async findChildren(parentId: string, activeOnly: boolean = false) {
    return prisma.category.findMany({
      where: {
        parentId,
        ...(activeOnly && { isActive: true }),
      },
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  /**
   * Update category by ID
   */
  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({
      where: { id },
      data,
      include: { parent: true, children: true },
    });
  }

  /**
   * Delete category by ID
   */
  async delete(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }

  /**
   * Check if category exists
   */
  async exists(id: string): Promise<boolean> {
    const category = await prisma.category.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!category;
  }

  /**
   * Check if slug exists
   */
  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const category = await prisma.category.findFirst({
      where: {
        slug,
        ...(excludeId && { NOT: { id: excludeId } }),
      },
      select: { id: true },
    });
    return !!category;
  }

  /**
   * Get category breadcrumb path
   */
  async getBreadcrumb(categoryId: string): Promise<{ id: string; name: string; slug: string }[]> {
    const breadcrumb: { id: string; name: string; slug: string }[] = [];
    let currentId: string | null = categoryId;

    while (currentId) {
      const category: { id: string; name: string; slug: string; parentId: string | null } | null = 
        await prisma.category.findUnique({
          where: { id: currentId },
          select: { id: true, name: true, slug: true, parentId: true },
        });

      if (!category) break;

      breadcrumb.unshift({
        id: category.id,
        name: category.name,
        slug: category.slug,
      });

      currentId = category.parentId;
    }

    return breadcrumb;
  }

  /**
   * Get category count
   */
  async count(activeOnly: boolean = false): Promise<number> {
    return prisma.category.count({
      where: activeOnly ? { isActive: true } : undefined,
    });
  }
}

export const categoryRepository = new CategoryRepository();
