"use client";

import { useState } from "react";
import { Star, FileText, Heart, Share2, Check, Minus, Plus } from "lucide-react";
import type { ProductWithDetails } from "@/types/product";
import { RfqModal } from "@/components/rfq/RfqModal";

interface ProductInfoProps {
  product: ProductWithDetails;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  const formatPrice = (price: number | { toString: () => string }, currency: string) => {
    const numPrice = typeof price === "number" ? price : parseFloat(price.toString());
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(numPrice);
  };

  const discount = product.salePrice
    ? Math.round(
        ((parseFloat(product.price.toString()) - parseFloat(product.salePrice.toString())) /
          parseFloat(product.price.toString())) *
          100
      )
    : 0;

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

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

      {/* Price */}
      <div className="flex items-baseline gap-3">
        {product.salePrice ? (
          <>
            <span className="text-3xl font-bold text-red-600">
              {formatPrice(product.salePrice, product.currency)}
            </span>
            <span className="text-xl text-gray-400 line-through">
              {formatPrice(product.price, product.currency)}
            </span>
            <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
              -{discount}%
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price, product.currency)}
          </span>
        )}
      </div>

      {/* Short Description */}
      {product.shortDescription && (
        <p className="text-gray-600">{product.shortDescription}</p>
      )}

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {product.stock > 0 ? (
          <>
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-green-600 font-medium">
              In Stock ({product.stock} available)
            </span>
          </>
        ) : (
          <span className="text-red-600 font-medium">Out of Stock</span>
        )}
      </div>

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

      {/* Quantity & Add to Cart */}
      {product.stock > 0 && (
        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
              className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Request Quote (RFQ) Button */}
          <button
            onClick={() => setIsRfqOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#D28E45] text-white rounded-lg hover:bg-[#C07D35] transition-colors font-medium"
          >
            <FileText className="w-5 h-5" />
            Request Quote (RFQ)
          </button>
        </div>
      )}

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
