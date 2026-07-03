import { productRepository, productReviewRepository } from "@/repositories";
import type { CreateProductReviewInput } from "@/validators/product";

// ============================================
// REVIEW SERVICE
// ============================================

export class ReviewService {
  /**
   * Create a new product review
   */
  async createReview(input: CreateProductReviewInput) {
    const productExists = await productRepository.exists(input.productId);
    if (!productExists) {
      throw new Error("Product not found");
    }

    return productReviewRepository.create({
      userName: input.userName,
      email: input.email,
      rating: input.rating,
      title: input.title,
      comment: input.comment,
      isApproved: false,
      product: { connect: { id: input.productId } },
    });
  }

  /**
   * Get review by ID
   */
  async getReviewById(id: string) {
    return productReviewRepository.findById(id);
  }

  /**
   * Get reviews for a product
   */
  async getProductReviews(productId: string, approvedOnly: boolean = true) {
    return productReviewRepository.findByProductId(productId, approvedOnly);
  }

  /**
   * Get all reviews with pagination
   */
  async getAllReviews(
    page: number = 1,
    limit: number = 20,
    filters: { isApproved?: boolean; productId?: string } = {}
  ) {
    return productReviewRepository.findMany(page, limit, filters);
  }

  /**
   * Approve a review
   */
  async approveReview(id: string) {
    const review = await productReviewRepository.findById(id);
    if (!review) {
      throw new Error("Review not found");
    }

    return productReviewRepository.approve(id);
  }

  /**
   * Reject a review
   */
  async rejectReview(id: string) {
    const review = await productReviewRepository.findById(id);
    if (!review) {
      throw new Error("Review not found");
    }

    return productReviewRepository.reject(id);
  }

  /**
   * Delete a review
   */
  async deleteReview(id: string) {
    const review = await productReviewRepository.findById(id);
    if (!review) {
      throw new Error("Review not found");
    }

    return productReviewRepository.delete(id);
  }

  /**
   * Get average rating for a product
   */
  async getProductAverageRating(productId: string) {
    return productReviewRepository.getAverageRating(productId);
  }

  /**
   * Get review count for a product
   */
  async getProductReviewCount(productId: string, approvedOnly: boolean = true) {
    return productReviewRepository.getReviewCount(productId, approvedOnly);
  }

  /**
   * Get rating distribution for a product
   */
  async getProductRatingDistribution(productId: string) {
    return productReviewRepository.getRatingDistribution(productId);
  }

  /**
   * Get pending reviews count
   */
  async getPendingReviewsCount() {
    return productReviewRepository.getPendingCount();
  }
}

export const reviewService = new ReviewService();
