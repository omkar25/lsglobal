import Link from "next/link";
import { reviewService } from "@/services";
import { ReviewsTable } from "@/components/admin/reviews/ReviewsTable";

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ isApproved?: string }>;
}) {
  const params = await searchParams;
  const isApproved = params.isApproved === "true" ? true : params.isApproved === "false" ? false : undefined;
  
  const { reviews } = await reviewService.getAllReviews(1, 100, { isApproved });
  const pendingCount = await reviewService.getPendingReviewsCount();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 mt-1">
            Manage product reviews ({pendingCount} pending approval)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/reviews"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isApproved === undefined
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </Link>
          <Link
            href="/admin/reviews?isApproved=false"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isApproved === false
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending
          </Link>
          <Link
            href="/admin/reviews?isApproved=true"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isApproved === true
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Approved
          </Link>
        </div>
      </div>

      <ReviewsTable reviews={reviews} />
    </div>
  );
}
