import prisma from "@/lib/db";
import { generateUniqueProductCode } from "@/lib/productCode";
import { generateUniqueProductSlug } from "@/lib/slug";
import {
  productRepository,
  productImageRepository,
  productFeatureRepository,
  productReviewRepository,
} from "@/repositories";
import type {
  CreateProductDTO,
  UpdateProductDTO,
  ProductFilters,
  ProductSortField,
  PaginatedResponse,
  ProductListItem,
  ProductWithDetails,
} from "@/types/product";
import type { CreateProductInput, UpdateProductInput } from "@/validators/product";

// ============================================
// PRODUCT SERVICE
// ============================================

export class ProductService {
  /**
   * Create a new product with images and features
   */
  async createProduct(input: CreateProductInput): Promise<ProductWithDetails> {
    const productCode = await generateUniqueProductCode();
    const slug = await generateUniqueProductSlug(input.name);

    const product = await prisma.$transaction(async (tx) => {
      const newProduct = await tx.product.create({
        data: {
          productCode,
          slug,
          name: input.name,
          description: input.description,
          shortDescription: input.shortDescription,
          price: input.price,
          salePrice: input.salePrice,
          currency: input.currency ?? "USD",
          isPublished: input.isPublished ?? false,
          isFeatured: input.isFeatured ?? false,
          stock: input.stock ?? 0,
          sku: input.sku,
          metaTitle: input.metaTitle,
          metaDescription: input.metaDescription,
          brandId: input.brandId,
          categoryId: input.categoryId,
          status: input.isPublished ? "PUBLISHED" : "DRAFT",
        },
      });

      if (input.images && input.images.length > 0) {
        await tx.productImage.createMany({
          data: input.images.map((img, index) => ({
            productId: newProduct.id,
            url: img.url,
            alt: img.alt,
            sortOrder: img.sortOrder ?? index,
            isPrimary: img.isPrimary ?? index === 0,
          })),
        });
      }

      if (input.features && input.features.length > 0) {
        await tx.productFeature.createMany({
          data: input.features.map((feature, index) => ({
            productId: newProduct.id,
            title: feature.title,
            value: feature.value,
            sortOrder: feature.sortOrder ?? index,
          })),
        });
      }

      return newProduct;
    });

    return this.getProductById(product.id) as Promise<ProductWithDetails>;
  }

  /**
   * Update an existing product
   */
  async updateProduct(id: string, input: UpdateProductInput): Promise<ProductWithDetails> {
    const existingProduct = await productRepository.findById(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    let slug = existingProduct.slug;
    if (input.name && input.name !== existingProduct.name) {
      slug = await generateUniqueProductSlug(input.name, id);
    }

    const status = input.isPublished !== undefined
      ? input.isPublished
        ? "PUBLISHED"
        : "DRAFT"
      : undefined;

    await productRepository.update(id, {
      ...input,
      slug,
      ...(status && { status }),
    });

    return this.getProductById(id) as Promise<ProductWithDetails>;
  }

  /**
   * Delete a product
   */
  async deleteProduct(id: string): Promise<void> {
    const exists = await productRepository.exists(id);
    if (!exists) {
      throw new Error("Product not found");
    }

    await productRepository.delete(id);
  }

  /**
   * Get product by ID with all details
   */
  async getProductById(id: string): Promise<ProductWithDetails | null> {
    const product = await productRepository.findById(id);
    if (!product) return null;

    const [averageRating, reviewCount] = await Promise.all([
      productReviewRepository.getAverageRating(id),
      productReviewRepository.getReviewCount(id),
    ]);

    return {
      ...product,
      price: Number(product.price),
      salePrice: product.salePrice != null ? Number(product.salePrice) : null,
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount,
    } as ProductWithDetails;
  }

  /**
   * Get product by slug with all details
   */
  async getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
    const product = await productRepository.findBySlug(slug);
    if (!product) return null;

    const [averageRating, reviewCount] = await Promise.all([
      productReviewRepository.getAverageRating(product.id),
      productReviewRepository.getReviewCount(product.id),
    ]);

    return {
      ...product,
      price: Number(product.price),
      salePrice: product.salePrice != null ? Number(product.salePrice) : null,
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount,
    } as ProductWithDetails;
  }

  /**
   * Get product by product code
   */
  async getProductByCode(productCode: string) {
    return productRepository.findByProductCode(productCode.toUpperCase());
  }

  /**
   * Get paginated product list with filters
   */
  async getProducts(
    filters: ProductFilters = {},
    page: number = 1,
    limit: number = 12,
    sortBy: ProductSortField = "newest"
  ): Promise<PaginatedResponse<ProductListItem>> {
    const { products, meta } = await productRepository.findMany(
      filters,
      page,
      limit,
      sortBy
    );

    const productListItems: ProductListItem[] = await Promise.all(
      products.map(async (product) => {
        const avgRating = await productReviewRepository.getAverageRating(product.id);
        const reviewCount = product.reviews.length;

        return {
          id: product.id,
          productCode: product.productCode,
          name: product.name,
          slug: product.slug,
          shortDescription: product.shortDescription,
          price: product.price,
          salePrice: product.salePrice,
          currency: product.currency,
          status: product.status,
          isPublished: product.isPublished,
          isFeatured: product.isFeatured,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
          primaryImage: product.images[0] || null,
          averageRating: Math.round(avgRating * 10) / 10,
          reviewCount,
          createdAt: product.createdAt,
        };
      })
    );

    if (sortBy === "rating") {
      productListItems.sort((a, b) => b.averageRating - a.averageRating);
    }

    return { data: productListItems, meta };
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 8): Promise<ProductListItem[]> {
    const products = await productRepository.findFeatured(limit);

    return Promise.all(
      products.map(async (product) => {
        const avgRating = await productReviewRepository.getAverageRating(product.id);
        return {
          id: product.id,
          productCode: product.productCode,
          name: product.name,
          slug: product.slug,
          shortDescription: product.shortDescription,
          price: product.price,
          salePrice: product.salePrice,
          currency: product.currency,
          status: product.status,
          isPublished: product.isPublished,
          isFeatured: product.isFeatured,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
          primaryImage: product.images[0] || null,
          averageRating: Math.round(avgRating * 10) / 10,
          reviewCount: product.reviews.length,
          createdAt: product.createdAt,
        };
      })
    );
  }

  /**
   * Get related products
   */
  async getRelatedProducts(productId: string, limit: number = 4): Promise<ProductListItem[]> {
    const product = await productRepository.findById(productId);
    if (!product) return [];

    const relatedProducts = await productRepository.findRelated(
      productId,
      product.categoryId,
      limit
    );

    return Promise.all(
      relatedProducts.map(async (p) => {
        const avgRating = await productReviewRepository.getAverageRating(p.id);
        return {
          id: p.id,
          productCode: p.productCode,
          name: p.name,
          slug: p.slug,
          shortDescription: p.shortDescription,
          price: p.price,
          salePrice: p.salePrice,
          currency: p.currency,
          status: p.status,
          isPublished: p.isPublished,
          isFeatured: p.isFeatured,
          stock: p.stock,
          brand: p.brand,
          category: null,
          primaryImage: p.images[0] || null,
          averageRating: Math.round(avgRating * 10) / 10,
          reviewCount: p.reviews.length,
          createdAt: p.createdAt,
        };
      })
    );
  }

  /**
   * Publish a product
   */
  async publishProduct(id: string) {
    const exists = await productRepository.exists(id);
    if (!exists) {
      throw new Error("Product not found");
    }

    return productRepository.publish(id);
  }

  /**
   * Unpublish a product
   */
  async unpublishProduct(id: string) {
    const exists = await productRepository.exists(id);
    if (!exists) {
      throw new Error("Product not found");
    }

    return productRepository.unpublish(id);
  }

  /**
   * Get product statistics
   */
  async getProductStats() {
    return productRepository.countByStatus();
  }

  // ============================================
  // PRODUCT IMAGES
  // ============================================

  async addProductImage(productId: string, data: { url: string; alt?: string; isPrimary?: boolean }) {
    const exists = await productRepository.exists(productId);
    if (!exists) {
      throw new Error("Product not found");
    }

    const images = await productImageRepository.findByProductId(productId);
    const sortOrder = images.length;

    return productImageRepository.create({
      url: data.url,
      alt: data.alt,
      sortOrder,
      isPrimary: data.isPrimary ?? images.length === 0,
      product: { connect: { id: productId } },
    });
  }

  async updateProductImage(imageId: string, data: { url?: string; alt?: string; isPrimary?: boolean }) {
    const image = await productImageRepository.findById(imageId);
    if (!image) {
      throw new Error("Image not found");
    }

    if (data.isPrimary) {
      await productImageRepository.setPrimary(imageId, image.productId);
      return productImageRepository.findById(imageId);
    }

    return productImageRepository.update(imageId, data);
  }

  async deleteProductImage(imageId: string) {
    const image = await productImageRepository.findById(imageId);
    if (!image) {
      throw new Error("Image not found");
    }

    await productImageRepository.delete(imageId);

    if (image.isPrimary) {
      const remainingImages = await productImageRepository.findByProductId(image.productId);
      if (remainingImages.length > 0) {
        await productImageRepository.setPrimary(remainingImages[0].id, image.productId);
      }
    }
  }

  async reorderProductImages(productId: string, imageIds: string[]) {
    return productImageRepository.reorder(productId, imageIds);
  }

  // ============================================
  // PRODUCT FEATURES
  // ============================================

  async addProductFeature(productId: string, data: { title: string; value: string }) {
    const exists = await productRepository.exists(productId);
    if (!exists) {
      throw new Error("Product not found");
    }

    const features = await productFeatureRepository.findByProductId(productId);
    const sortOrder = features.length;

    return productFeatureRepository.create({
      title: data.title,
      value: data.value,
      sortOrder,
      product: { connect: { id: productId } },
    });
  }

  async updateProductFeature(featureId: string, data: { title?: string; value?: string }) {
    const feature = await productFeatureRepository.findById(featureId);
    if (!feature) {
      throw new Error("Feature not found");
    }

    return productFeatureRepository.update(featureId, data);
  }

  async deleteProductFeature(featureId: string) {
    const feature = await productFeatureRepository.findById(featureId);
    if (!feature) {
      throw new Error("Feature not found");
    }

    return productFeatureRepository.delete(featureId);
  }

  async bulkUpdateProductFeatures(
    productId: string,
    features: { title: string; value: string; sortOrder?: number }[]
  ) {
    const exists = await productRepository.exists(productId);
    if (!exists) {
      throw new Error("Product not found");
    }

    return productFeatureRepository.bulkUpdate(productId, features);
  }
}

export const productService = new ProductService();
