"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  title: string | null;
  comment: string | null;
  createdAt: Date;
}

interface ProductReviewsProps {
  productId: string;
  productSlug: string;
  reviews: ProductReview[];
  averageRating: number;
  reviewCount: number;
}

export function ProductReviews({
  productId,
  productSlug,
  reviews,
  averageRating,
  reviewCount,
}: ProductReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    rating: 5,
    title: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const ratingDistribution = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(`/api/shop/products/${productSlug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage("Thank you! Your review has been submitted and is pending approval.");
        setFormData({ userName: "", email: "", rating: 5, title: "", comment: "" });
        setShowForm(false);
      } else {
        setSubmitMessage(result.error || "Failed to submit review");
      }
    } catch {
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[#D28E45] text-white rounded-lg hover:bg-[#C07D35] transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">Based on {reviewCount} reviews</p>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating] || 0;
            const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;

            return (
              <div key={rating} className="flex items-center gap-2">
                <span className="w-3 text-sm text-gray-600">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-sm text-gray-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Message */}
      {submitMessage && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            submitMessage.includes("Thank you")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {submitMessage}
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Write Your Review</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D28E45] focus:border-[#D28E45] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D28E45] focus:border-[#D28E45] outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating *
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating })}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      rating <= formData.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D28E45] focus:border-[#D28E45] outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D28E45] focus:border-[#D28E45] outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#D28E45] text-white rounded-lg hover:bg-[#C07D35] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="pb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{review.userName}</span>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {review.title && (
                <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
              )}
              {review.comment && <p className="text-gray-600">{review.comment}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
}
