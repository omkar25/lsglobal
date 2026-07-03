import prisma from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma";

// ============================================
// PRODUCT FEATURE REPOSITORY
// ============================================

export class ProductFeatureRepository {
  /**
   * Create a new product feature
   */
  async create(data: Prisma.ProductFeatureCreateInput) {
    return prisma.productFeature.create({ data });
  }

  /**
   * Create multiple product features
   */
  async createMany(productId: string, features: Omit<Prisma.ProductFeatureCreateManyInput, "productId">[]) {
    return prisma.productFeature.createMany({
      data: features.map((feature) => ({ ...feature, productId })),
    });
  }

  /**
   * Find feature by ID
   */
  async findById(id: string) {
    return prisma.productFeature.findUnique({
      where: { id },
    });
  }

  /**
   * Find all features for a product
   */
  async findByProductId(productId: string) {
    return prisma.productFeature.findMany({
      where: { productId },
      orderBy: { sortOrder: "asc" },
    });
  }

  /**
   * Update feature by ID
   */
  async update(id: string, data: Prisma.ProductFeatureUpdateInput) {
    return prisma.productFeature.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete feature by ID
   */
  async delete(id: string) {
    return prisma.productFeature.delete({
      where: { id },
    });
  }

  /**
   * Delete all features for a product
   */
  async deleteByProductId(productId: string) {
    return prisma.productFeature.deleteMany({
      where: { productId },
    });
  }

  /**
   * Reorder features
   */
  async reorder(productId: string, featureIds: string[]) {
    const updates = featureIds.map((id, index) =>
      prisma.productFeature.update({
        where: { id },
        data: { sortOrder: index },
      })
    );

    return prisma.$transaction(updates);
  }

  /**
   * Bulk update features for a product (delete all and recreate)
   */
  async bulkUpdate(
    productId: string,
    features: Omit<Prisma.ProductFeatureCreateManyInput, "productId">[]
  ) {
    return prisma.$transaction([
      prisma.productFeature.deleteMany({ where: { productId } }),
      prisma.productFeature.createMany({
        data: features.map((feature, index) => ({
          ...feature,
          productId,
          sortOrder: feature.sortOrder ?? index,
        })),
      }),
    ]);
  }
}

export const productFeatureRepository = new ProductFeatureRepository();
