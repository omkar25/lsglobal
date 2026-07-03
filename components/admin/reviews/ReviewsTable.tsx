"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Trash2, Star } from "lucide-react";
import Swal from "sweetalert2";

type Review = {
  id: string;
  userName: string;
  email: string;
  rating: number;
  title: string | null;
  comment: string | null;
  isApproved: boolean;
  isVerified: boolean;
  createdAt: Date;
  product: {
    id: string;
    name: string;
  };
};

interface ReviewsTableProps {
  reviews: Review[];
}

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/reviews/${id}/approve`, {
        method: "POST",
      });

      if (response.ok) {
        await Swal.fire({
          title: "Approved!",
          text: "Review has been approved successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.refresh();
      } else {
        const data = await response.json();
        await Swal.fire({
          title: "Error!",
          text: data.error || "Failed to approve review",
          icon: "error",
        });
      }
    } catch {
      await Swal.fire({
        title: "Error!",
        text: "Failed to approve review",
        icon: "error",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const result = await Swal.fire({
      title: "Reject Review?",
      text: "Are you sure you want to reject this review? It will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await Swal.fire({
          title: "Rejected!",
          text: "Review has been rejected.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.refresh();
      } else {
        const data = await response.json();
        await Swal.fire({
          title: "Error!",
          text: data.error || "Failed to reject review",
          icon: "error",
        });
      }
    } catch {
      await Swal.fire({
        title: "Error!",
        text: "Failed to reject review",
        icon: "error",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "Are you sure you want to delete this review? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    setProcessingId(id);
    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await Swal.fire({
          title: "Deleted!",
          text: "Review has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.refresh();
      } else {
        const data = await response.json();
        await Swal.fire({
          title: "Error!",
          text: data.error || "Failed to delete review",
          icon: "error",
        });
      }
    } catch {
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete review",
        icon: "error",
      });
    } finally {
      setProcessingId(null);
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No reviews found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Review
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Product
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Rating
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <tr key={review.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900">{review.userName}</p>
                  <p className="text-sm text-gray-500">{review.email}</p>
                  {review.title && (
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      {review.title}
                    </p>
                  )}
                  {review.comment && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {review.comment}
                    </p>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-gray-900">{review.product.name}</p>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    review.isApproved
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {review.isApproved ? "Approved" : "Pending"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  {!review.isApproved && (
                    <>
                      <button
                        onClick={() => handleApprove(review.id)}
                        disabled={processingId === review.id}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(review.id)}
                        disabled={processingId === review.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={processingId === review.id}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
