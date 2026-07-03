import prisma from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma";

// ============================================
// PRODUCT IMAGE REPOSITORY
// ============================================

export class ProductImageRepository {
  /**
   * Create a new product image
   */
  async create(data: Prisma.ProductImageCreateInput) {
    return prisma.productImage.create({ data });
  }

  /**
   * Create multiple product images
   */
  async createMany(productId: string, images: Omit<Prisma.ProductImageCreateManyInput, "productId">[]) {
    return prisma.productImage.createMany({
      data: images.map((img) => ({ ...img, productId })),
    });
  }

  /**
   * Find image by ID
   */
  async findById(id: string) {
    return prisma.productImage.findUnique({
      where: { id },
    });
  }

  /**
   * Find all images for a product
   */
  async findByProductId(productId: string) {
    return prisma.productImage.findMany({
      where: { productId },
      orderBy: { sortOrder: "asc" },
    });
  }

  /**
   * Update image by ID
   */
  async update(id: string, data: Prisma.ProductImageUpdateInput) {
    return prisma.productImage.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete image by ID
   */
  async delete(id: string) {
    return prisma.productImage.delete({
      where: { id },
    });
  }

  /**
   * Delete all images for a product
   */
  async deleteByProductId(productId: string) {
    return prisma.productImage.deleteMany({
      where: { productId },
    });
  }

  /**
   * Set primary image (unsets other primary images for the product)
   */
  async setPrimary(id: string, productId: string) {
    return prisma.$transaction([
      prisma.productImage.updateMany({
        where: { productId, isPrimary: true },
        data: { isPrimary: false },
      }),
      prisma.productImage.update({
        where: { id },
        data: { isPrimary: true },
      }),
    ]);
  }

  /**
   * Reorder images
   */
  async reorder(productId: string, imageIds: string[]) {
    const updates = imageIds.map((id, index) =>
      prisma.productImage.update({
        where: { id },
        data: { sortOrder: index },
      })
    );

    return prisma.$transaction(updates);
  }

  /**
   * Get primary image for a product
   */
  async getPrimaryImage(productId: string) {
    return prisma.productImage.findFirst({
      where: { productId, isPrimary: true },
    });
  }
}

export const productImageRepository = new ProductImageRepository();
