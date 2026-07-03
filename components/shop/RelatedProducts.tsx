import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import type { ProductListItem } from "@/types/product";

interface RelatedProductsProps {
  products: ProductListItem[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const formatPrice = (price: number | { toString: () => string }, currency: string) => {
    const numPrice = typeof price === "number" ? price : parseFloat(price.toString());
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(numPrice);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Image */}
          <div className="relative aspect-square bg-gray-100">
            {product.primaryImage ? (
              <Image
                src={product.primaryImage.url}
                alt={product.primaryImage.alt || product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ShoppingCart className="w-8 h-8" />
              </div>
            )}
            {product.salePrice && (
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded">
                Sale
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 group-hover:text-[#D28E45] transition-colors line-clamp-2 mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.round(product.averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="font-bold text-red-600">
                    {formatPrice(product.salePrice, product.currency)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.price, product.currency)}
                  </span>
                </>
              ) : (
                <span className="font-bold text-gray-900">
                  {formatPrice(product.price, product.currency)}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
