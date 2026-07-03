import prisma from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma";

// ============================================
// PRODUCT REVIEW REPOSITORY
// ============================================

export class ProductReviewRepository {
  /**
   * Create a new product review
   */
  async create(data: Prisma.ProductReviewCreateInput) {
    return prisma.productReview.create({ data });
  }

  /**
   * Find review by ID
   */
  async findById(id: string) {
    return prisma.productReview.findUnique({
      where: { id },
      include: { product: { select: { id: true, name: true, slug: true } } },
    });
  }

  /**
   * Find all reviews for a product
   */
  async findByProductId(productId: string, approvedOnly: boolean = false) {
    return prisma.productReview.findMany({
      where: {
        productId,
        ...(approvedOnly && { isApproved: true }),
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Find all reviews with pagination
   */
  async findMany(
    page: number = 1,
    limit: number = 20,
    filters: { isApproved?: boolean; productId?: string } = {}
  ) {
    const where: Prisma.ProductReviewWhereInput = {};

    if (typeof filters.isApproved === "boolean") {
      where.isApproved = filters.isApproved;
    }

    if (filters.productId) {
      where.productId = filters.productId;
    }

    const [reviews, total] = await Promise.all([
      prisma.productReview.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          product: { select: { id: true, name: true, slug: true, productCode: true } },
        },
      }),
      prisma.productReview.count({ where }),
    ]);

    return {
      reviews,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  /**
   * Update review by ID
   */
  async update(id: string, data: Prisma.ProductReviewUpdateInput) {
    return prisma.productReview.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete review by ID
   */
  async delete(id: string) {
    return prisma.productReview.delete({
      where: { id },
    });
  }

  /**
   * Approve a review
   */
  async approve(id: string) {
    return prisma.productReview.update({
      where: { id },
      data: { isApproved: true },
    });
  }

  /**
   * Reject a review (unapprove)
   */
  async reject(id: string) {
    return prisma.productReview.update({
      where: { id },
      data: { isApproved: false },
    });
  }

  /**
   * Get average rating for a product
   */
  async getAverageRating(productId: string): Promise<number> {
    const result = await prisma.productReview.aggregate({
      where: { productId, isApproved: true },
      _avg: { rating: true },
    });

    return result._avg.rating ?? 0;
  }

  /**
   * Get review count for a product
   */
  async getReviewCount(productId: string, approvedOnly: boolean = true): Promise<number> {
    return prisma.productReview.count({
      where: {
        productId,
        ...(approvedOnly && { isApproved: true }),
      },
    });
  }

  /**
   * Get rating distribution for a product
   */
  async getRatingDistribution(productId: string) {
    const ratings = await prisma.productReview.groupBy({
      by: ["rating"],
      where: { productId, isApproved: true },
      _count: { rating: true },
    });

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach((r) => {
      distribution[r.rating] = r._count.rating;
    });

    return distribution;
  }

  /**
   * Get pending reviews count
   */
  async getPendingCount(): Promise<number> {
    return prisma.productReview.count({
      where: { isApproved: false },
    });
  }
}

export const productReviewRepository = new ProductReviewRepository();
