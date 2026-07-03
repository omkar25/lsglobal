import Link from "next/link";
import { Plus } from "lucide-react";
import { productService } from "@/services";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { ProductFiltersBar } from "@/components/admin/products/ProductFiltersBar";
import { Pagination } from "@/components/admin/Pagination";
import type { ProductSortField, ProductStatus } from "@/types/product";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: ProductStatus;
    categoryId?: string;
    brandId?: string;
    sortBy?: ProductSortField;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = 10;

  const filters = {
    search: params.search,
    status: params.status,
    categoryId: params.categoryId,
    brandId: params.brandId,
  };

  const sortBy = params.sortBy || "newest";

  const { data: products, meta } = await productService.getProducts(
    filters,
    page,
    limit,
    sortBy
  );

  // Convert Decimal to number for client components
  const serializedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
    salePrice: product.salePrice ? Number(product.salePrice) : null,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your product catalog ({meta.total} total)
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <ProductFiltersBar />

        <ProductsTable products={serializedProducts} />

        {meta.totalPages > 1 && (
          <div className="p-4 border-t border-gray-200">
            <Pagination meta={meta} />
          </div>
        )}
      </div>
    </div>
  );
}
