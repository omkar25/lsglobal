import prisma from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma";

// ============================================
// BRAND REPOSITORY
// ============================================

export class BrandRepository {
  /**
   * Create a new brand
   */
  async create(data: Prisma.BrandCreateInput) {
    return prisma.brand.create({ data });
  }

  /**
   * Find brand by ID
   */
  async findById(id: string) {
    return prisma.brand.findUnique({
      where: { id },
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  /**
   * Find brand by slug
   */
  async findBySlug(slug: string) {
    return prisma.brand.findUnique({
      where: { slug },
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  /**
   * Find brand by name
   */
  async findByName(name: string) {
    return prisma.brand.findUnique({
      where: { name },
    });
  }

  /**
   * Find all brands
   */
  async findAll() {
    return prisma.brand.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  /**
   * Find brands with products
   */
  async findWithProducts() {
    return prisma.brand.findMany({
      where: {
        products: { some: { isPublished: true } },
      },
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: { where: { isPublished: true } } } },
      },
    });
  }

  /**
   * Update brand by ID
   */
  async update(id: string, data: Prisma.BrandUpdateInput) {
    return prisma.brand.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete brand by ID
   */
  async delete(id: string) {
    return prisma.brand.delete({
      where: { id },
    });
  }

  /**
   * Check if brand exists
   */
  async exists(id: string): Promise<boolean> {
    const brand = await prisma.brand.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!brand;
  }

  /**
   * Check if slug exists
   */
  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const brand = await prisma.brand.findFirst({
      where: {
        slug,
        ...(excludeId && { NOT: { id: excludeId } }),
      },
      select: { id: true },
    });
    return !!brand;
  }

  /**
   * Check if name exists
   */
  async nameExists(name: string, excludeId?: string): Promise<boolean> {
    const brand = await prisma.brand.findFirst({
      where: {
        name,
        ...(excludeId && { NOT: { id: excludeId } }),
      },
      select: { id: true },
    });
    return !!brand;
  }

  /**
   * Get brand count
   */
  async count(): Promise<number> {
    return prisma.brand.count();
  }
}

export const brandRepository = new BrandRepository();
