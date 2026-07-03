"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Edit, Trash2, Eye, EyeOff, MoreVertical } from "lucide-react";
import { publishProductAction, unpublishProductAction, deleteProductAction } from "@/app/actions/product.actions";
import type { ProductListItem } from "@/types/product";

interface ProductsTableProps {
  products: ProductListItem[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handlePublish = async (id: string) => {
    setLoadingId(id);
    await publishProductAction(id);
    setLoadingId(null);
  };

  const handleUnpublish = async (id: string) => {
    setLoadingId(id);
    await unpublishProductAction(id);
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoadingId(id);
    await deleteProductAction(id);
    setLoadingId(null);
  };

  const formatPrice = (price: number | { toString: () => string }, currency: string) => {
    const numPrice = typeof price === "number" ? price : parseFloat(price.toString());
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(numPrice);
  };

  if (products.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-gray-500">No products found</p>
        <Link
          href="/admin/products/new"
          className="inline-block mt-4 text-blue-600 hover:text-blue-700"
        >
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    {product.primaryImage ? (
                      <Image
                        src={product.primaryImage.url}
                        alt={product.primaryImage.alt || product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <MoreVertical className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-medium text-gray-900 hover:text-blue-600"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {product.category?.name || "No category"}
                      {product.brand && ` • ${product.brand.name}`}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                  {product.productCode}
                </code>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900">
                    {formatPrice(product.price, product.currency)}
                  </p>
                  {product.salePrice && (
                    <p className="text-sm text-green-600">
                      Sale: {formatPrice(product.salePrice, product.currency)}
                    </p>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 10
                      ? "bg-green-100 text-green-700"
                      : product.stock > 0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock} in stock
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === "PUBLISHED"
                      ? "bg-green-100 text-green-700"
                      : product.status === "DRAFT"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {product.status}
                </span>
                {product.isFeatured && (
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-gray-900">{product.averageRating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm">({product.reviewCount})</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  {product.isPublished ? (
                    <button
                      onClick={() => handleUnpublish(product.id)}
                      disabled={loadingId === product.id}
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Unpublish"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublish(product.id)}
                      disabled={loadingId === product.id}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Publish"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={loadingId === product.id}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
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
