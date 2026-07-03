import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import type { ProductListItem } from "@/types/product";

interface ProductGridProps {
  products: ProductListItem[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const formatPrice = (price: number | { toString: () => string }, currency: string) => {
    const numPrice = typeof price === "number" ? price : parseFloat(price.toString());
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(numPrice);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
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
                <ShoppingCart className="w-12 h-12" />
              </div>
            )}
            {product.salePrice && (
              <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                Sale
              </span>
            )}
            {product.isFeatured && (
              <span className="absolute top-3 right-3 px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded">
                Featured
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category & Brand */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              {product.category && <span>{product.category.name}</span>}
              {product.category && product.brand && <span>•</span>}
              {product.brand && <span>{product.brand.name}</span>}
            </div>

            {/* Name */}
            <h3 className="font-semibold text-gray-900 group-hover:text-[#D28E45] transition-colors line-clamp-2 mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-bold text-red-600">
                    {formatPrice(product.salePrice, product.currency)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.price, product.currency)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price, product.currency)}
                </span>
              )}
            </div>

            {/* Stock */}
            {product.stock === 0 && (
              <p className="text-sm text-red-500 mt-2">Out of stock</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
