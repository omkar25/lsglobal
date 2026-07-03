import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categoryService, brandService } from "@/services";
import { ProductForm } from "@/components/admin/products/ProductForm";

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    categoryService.getAllCategories(),
    brandService.getAllBrands(),
  ]);

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
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-1">Create a new product in your catalog</p>
      </div>

      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        brands={brands.map((b) => ({ id: b.id, name: b.name }))}
      />
    </div>
  );
}
