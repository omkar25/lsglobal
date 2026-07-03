import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { productService, categoryService } from "@/services";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductInfo } from "@/components/shop/ProductInfo";
import { ProductFeatures } from "@/components/shop/ProductFeatures";
import { ProductReviews } from "@/components/shop/ProductReviews";
import { RelatedProducts } from "@/components/shop/RelatedProducts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product || !product.isPublished) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product || !product.isPublished) {
    notFound();
  }

  const [relatedProducts, breadcrumb] = await Promise.all([
    productService.getRelatedProducts(product.id, 4),
    product.categoryId
      ? categoryService.getCategoryBreadcrumb(product.categoryId)
      : Promise.resolve([]),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-gray-700">
            Products
          </Link>
          {breadcrumb.map((item) => (
            <span key={item.id} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/c/${item.slug}`}
                className="hover:text-gray-700"
              >
                {item.name}
              </Link>
            </span>
          ))}
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="bg-white rounded-xl p-6 lg:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Features */}
        {product.features.length > 0 && (
          <div className="bg-white rounded-xl p-6 lg:p-8 mb-8">
            <ProductFeatures features={product.features} />
          </div>
        )}

        {/* Reviews */}
        <div className="bg-white rounded-xl p-6 lg:p-8 mb-8">
          <ProductReviews
            productId={product.id}
            productSlug={product.slug}
            reviews={product.reviews}
            averageRating={product.averageRating}
            reviewCount={product.reviewCount}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
