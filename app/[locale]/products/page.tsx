import { Suspense } from "react";
import { productService, categoryService, brandService } from "@/services";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { Pagination } from "@/components/admin/Pagination";
import { SortSelect } from "@/components/shop/SortSelect";
import type { ProductSortField } from "@/types/product";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    categorySlug?: string;
    brandSlug?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: ProductSortField;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = 12;

  const filters = {
    search: params.search,
    categorySlug: params.categorySlug,
    brandSlug: params.brandSlug,
    minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
    isPublished: true,
  };

  const sortBy = params.sortBy || "newest";

  const [productsResult, categories, brands] = await Promise.all([
    productService.getProducts(filters, page, limit, sortBy),
    categoryService.getCategoryTree(true),
    brandService.getBrandsWithProducts(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Discover our collection of {productsResult.meta.total} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProductFilters categories={categories} brands={brands} />
            </Suspense>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {(page - 1) * limit + 1}-
                  {Math.min(page * limit, productsResult.meta.total)} of{" "}
                  {productsResult.meta.total} products
                </p>
                <SortSelect currentSort={sortBy} />
              </div>
            </div>

            {/* Products */}
            {productsResult.data.length > 0 ? (
              <>
                <ProductGrid products={productsResult.data} />
                {productsResult.meta.totalPages > 1 && (
                  <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <Pagination meta={productsResult.meta} />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
