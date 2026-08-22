"use client";

import { useState } from "react";
import { Star, FileText, Heart, Share2 } from "lucide-react";
import type { ProductWithDetails } from "@/types/product";
import { RfqModal } from "@/components/rfq/RfqModal";

interface ProductInfoProps {
  product: ProductWithDetails;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Brand & Category */}
      <div className="flex items-center gap-2 text-sm">
        {product.brand && (
          <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">
            {product.brand.name}
          </span>
        )}
        {product.category && (
          <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Name */}
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.round(product.averageRating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-gray-600">
          {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Short Description */}
      {product.shortDescription && (
        <p className="text-gray-600">{product.shortDescription}</p>
      )}

      {/* Product Code & SKU */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>
          Code: <code className="font-mono">{product.productCode}</code>
        </span>
        {product.sku && (
          <span>
            SKU: <code className="font-mono">{product.sku}</code>
          </span>
        )}
      </div>

      {/* Request Quote (RFQ) Button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <button
          onClick={() => setIsRfqOpen(true)}
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 min-h-12 bg-[#D28E45] text-white rounded-lg hover:bg-[#C07D35] active:bg-[#C07D35] transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
        >
          <FileText className="w-5 h-5 shrink-0" />
          Request Quote (RFQ)
        </button>
      </div>

      {/* RFQ Modal */}
      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        initialProductName={product.name}
      />

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-4">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
          <span>Add to Wishlist</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-[#D28E45] transition-colors">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Description */}
      {product.description && (
        <div className="pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
        </div>
      )}
    </div>
  );
}
