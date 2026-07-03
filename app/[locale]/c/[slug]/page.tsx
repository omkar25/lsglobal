import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { productService, categoryService, brandService } from "@/services";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { Pagination } from "@/components/admin/Pagination";
import { SortSelect } from "@/components/shop/SortSelect";
import type { ProductSortField } from "@/types/product";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: ProductSortField;
    brandSlug?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await categoryService.getCategoryBySlug(slug);

  if (!category || !category.isActive) {
    return { title: "Category Not Found" };
  }

  return {
    title: category.name,
    description: category.description || `Browse products in ${category.name}`,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || "1", 10);
  const limit = 12;
  const sortBy = sp.sortBy || "newest";

  const category = await categoryService.getCategoryBySlug(slug);

  if (!category || !category.isActive) {
    notFound();
  }

  const [productsResult, breadcrumb, categories, brands] = await Promise.all([
    productService.getProducts(
      {
        categorySlug: slug,
        brandSlug: sp.brandSlug,
        minPrice: sp.minPrice ? parseFloat(sp.minPrice) : undefined,
        maxPrice: sp.maxPrice ? parseFloat(sp.maxPrice) : undefined,
        isPublished: true,
      },
      page,
      limit,
      sortBy
    ),
    categoryService.getCategoryBreadcrumb(category.id),
    categoryService.getCategoryTree(true),
    brandService.getBrandsWithProducts(),
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
          {breadcrumb.map((item, index) => (
            <span key={item.id} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              {index === breadcrumb.length - 1 ? (
                <span className="text-gray-900 font-medium">{item.name}</span>
              ) : (
                <Link href={`/c/${item.slug}`} className="hover:text-gray-700">
                  {item.name}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 mt-1">{category.description}</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProductFilters
                categories={categories}
                brands={brands}
                currentCategorySlug={slug}
                borderless
              />
            </Suspense>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {productsResult.meta.total > 0 ? (
                    <>
                      Showing {(page - 1) * limit + 1}-
                      {Math.min(page * limit, productsResult.meta.total)} of{" "}
                      {productsResult.meta.total} products
                    </>
                  ) : (
                    <>0 products</>
                  )}
                </p>
                <SortSelect currentSort={sortBy} />
              </div>
            </div>

            {/* Products */}
            {productsResult.data.length > 0 ? (
              <>
                <ProductGrid products={productsResult.data} />
                {productsResult.meta.totalPages > 1 && (
                  <div className="mt-8 bg-white rounded-lg p-4">
                    <Pagination meta={productsResult.meta} />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">No products found in this category</p>
                <Link
                  href="/products"
                  className="inline-block mt-4 text-sm font-semibold text-[#D28E45] hover:underline"
                >
                  Browse all products
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
