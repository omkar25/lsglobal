import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit, Eye, EyeOff, Star, Package } from "lucide-react";
import { productService } from "@/services";
import { PublishButton } from "@/components/admin/products/PublishButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await productService.getProductById(id);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number | { toString: () => string }, currency: string) => {
    const numPrice = typeof price === "number" ? price : parseFloat(price.toString());
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(numPrice);
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                {product.productCode}
              </code>
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
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PublishButton productId={product.id} isPublished={product.isPublished} />
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
            {product.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.images.map((image) => (
                  <div
                    key={image.id}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                      image.isPrimary ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || product.name}
                      fill
                      className="object-cover"
                    />
                    {image.isPrimary && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No images</p>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            {product.shortDescription && (
              <p className="text-gray-700 font-medium mb-4">{product.shortDescription}</p>
            )}
            {product.description ? (
              <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
            ) : (
              <p className="text-gray-500">No description</p>
            )}
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
            {product.features.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {product.features.map((feature) => (
                  <div key={feature.id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{feature.title}</span>
                    <span className="font-medium text-gray-900">{feature.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No features</p>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{product.averageRating.toFixed(1)}</span>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>
            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{review.userName}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <p className="font-medium text-gray-800 mb-1">{review.title}</p>
                    )}
                    {review.comment && <p className="text-gray-600">{review.comment}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(product.price, product.currency)}
                </span>
              </div>
              {product.salePrice && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Sale Price</span>
                  <span className="font-semibold text-green-600">
                    {formatPrice(product.salePrice, product.currency)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Currency</span>
                <span className="text-gray-900">{product.currency}</span>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Stock</span>
                <span
                  className={`font-semibold ${
                    product.stock > 10
                      ? "text-green-600"
                      : product.stock > 0
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {product.stock} units
                </span>
              </div>
              {product.sku && (
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU</span>
                  <span className="text-gray-900">{product.sku}</span>
                </div>
              )}
            </div>
          </div>

          {/* Category & Brand */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="text-gray-900">{product.category?.name || "None"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Brand</span>
                <span className="text-gray-900">{product.brand?.name || "None"}</span>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Slug</span>
                <p className="text-gray-900 font-mono text-sm">{product.slug}</p>
              </div>
              {product.metaTitle && (
                <div>
                  <span className="text-sm text-gray-500">Meta Title</span>
                  <p className="text-gray-900">{product.metaTitle}</p>
                </div>
              )}
              {product.metaDescription && (
                <div>
                  <span className="text-sm text-gray-500">Meta Description</span>
                  <p className="text-gray-900 text-sm">{product.metaDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
