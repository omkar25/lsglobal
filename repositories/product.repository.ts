import prisma from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma";
import type {
  ProductFilters,
  ProductSortField,
  PaginationMeta,
} from "@/types/product";

// ============================================
// PRODUCT REPOSITORY
// ============================================

export class ProductRepository {
  /**
   * Create a new product with optional images and features
   */
  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
      include: {
        brand: true,
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
      },
    });
  }

  /**
   * Find product by ID with all relations
   */
  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: {
          include: {
            parent: true,
            children: true,
          },
        },
        images: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  /**
   * Find product by slug with all relations
   */
  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: {
          include: {
            parent: true,
            children: true,
          },
        },
        images: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  /**
   * Find product by product code
   */
  async findByProductCode(productCode: string) {
    return prisma.product.findUnique({
      where: { productCode },
      include: {
        brand: true,
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
      },
    });
  }

  /**
   * Find product by SKU
   */
  async findBySku(sku: string) {
    return prisma.product.findUnique({
      where: { sku },
    });
  }

  /**
   * Update product by ID
   */
  async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        brand: true,
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
      },
    });
  }

  /**
   * Delete product by ID (cascades to images, features, reviews)
   */
  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }

  /**
   * Check if product exists by ID
   */
  async exists(id: string): Promise<boolean> {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!product;
  }

  /**
   * Check if slug exists (optionally excluding a specific product)
   */
  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const product = await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId && { NOT: { id: excludeId } }),
      },
      select: { id: true },
    });
    return !!product;
  }

  /**
   * Check if product code exists
   */
  async productCodeExists(productCode: string): Promise<boolean> {
    const product = await prisma.product.findUnique({
      where: { productCode },
      select: { id: true },
    });
    return !!product;
  }

  /**
   * Find products with pagination, filtering, and sorting
   */
  async findMany(
    filters: ProductFilters,
    page: number = 1,
    limit: number = 12,
    sortBy: ProductSortField = "newest"
  ) {
    const where = this.buildWhereClause(filters);
    const orderBy = this.buildOrderByClause(sortBy);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          brand: { select: { id: true, name: true, slug: true } },
          category: { select: { id: true, name: true, slug: true } },
          images: {
            where: { isPrimary: true },
            take: 1,
          },
          reviews: {
            where: { isApproved: true },
            select: { rating: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return { products, meta };
  }

  /**
   * Get featured products
   */
  async findFeatured(limit: number = 8) {
    return prisma.product.findMany({
      where: {
        isPublished: true,
        isFeatured: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        brand: { select: { id: true, name: true, slug: true } },
        category: { select: { id: true, name: true, slug: true } },
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        reviews: {
          where: { isApproved: true },
          select: { rating: true },
        },
      },
    });
  }

  /**
   * Get related products by category
   */
  async findRelated(productId: string, categoryId: string | null, limit: number = 4) {
    return prisma.product.findMany({
      where: {
        isPublished: true,
        id: { not: productId },
        ...(categoryId && { categoryId }),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        brand: { select: { id: true, name: true, slug: true } },
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        reviews: {
          where: { isApproved: true },
          select: { rating: true },
        },
      },
    });
  }

  /**
   * Publish a product
   */
  async publish(id: string) {
    return prisma.product.update({
      where: { id },
      data: {
        isPublished: true,
        status: "PUBLISHED",
      },
    });
  }

  /**
   * Unpublish a product
   */
  async unpublish(id: string) {
    return prisma.product.update({
      where: { id },
      data: {
        isPublished: false,
        status: "DRAFT",
      },
    });
  }

  /**
   * Get product count by status
   */
  async countByStatus() {
    const [total, published, draft, archived] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: "PUBLISHED" } }),
      prisma.product.count({ where: { status: "DRAFT" } }),
      prisma.product.count({ where: { status: "ARCHIVED" } }),
    ]);

    return { total, published, draft, archived };
  }

  /**
   * Build Prisma where clause from filters
   */
  private buildWhereClause(filters: ProductFilters): Prisma.ProductWhereInput {
    const where: Prisma.ProductWhereInput = {};

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { shortDescription: { contains: filters.search, mode: "insensitive" } },
        { productCode: { contains: filters.search.toUpperCase(), mode: "insensitive" } },
      ];
    }

    if (filters.productCode) {
      where.productCode = filters.productCode.toUpperCase();
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.categorySlug) {
      where.category = { slug: filters.categorySlug };
    }

    if (filters.brandId) {
      where.brandId = filters.brandId;
    }

    if (filters.brandSlug) {
      where.brand = { slug: filters.brandSlug };
    }

    if (typeof filters.isPublished === "boolean") {
      where.isPublished = filters.isPublished;
    }

    if (typeof filters.isFeatured === "boolean") {
      where.isFeatured = filters.isFeatured;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice;
      }
    }

    if (filters.inStock) {
      where.stock = { gt: 0 };
    }

    return where;
  }

  /**
   * Build Prisma orderBy clause from sort field
   */
  private buildOrderByClause(
    sortBy: ProductSortField
  ): Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[] {
    switch (sortBy) {
      case "newest":
        return { createdAt: "desc" };
      case "oldest":
        return { createdAt: "asc" };
      case "price_asc":
        return { price: "asc" };
      case "price_desc":
        return { price: "desc" };
      case "name_asc":
        return { name: "asc" };
      case "name_desc":
        return { name: "desc" };
      case "popularity":
        return { reviews: { _count: "desc" } };
      case "rating":
        return { createdAt: "desc" }; // Will be handled in service layer
      default:
        return { createdAt: "desc" };
    }
  }
}

export const productRepository = new ProductRepository();
