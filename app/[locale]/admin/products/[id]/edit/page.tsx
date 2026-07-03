import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { productService, categoryService, brandService } from "@/services";
import { ProductForm } from "@/components/admin/products/ProductForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;

  const [product, categories, brands] = await Promise.all([
    productService.getProductById(id),
    categoryService.getAllCategories(),
    brandService.getAllBrands(),
  ]);

  if (!product) {
    notFound();
  }

  // Convert Decimal to number for client components
  const serializedProduct = {
    ...product,
    price: Number(product.price),
    salePrice: product.salePrice ? Number(product.salePrice) : null,
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
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600 mt-1">
          {product.name}{" "}
          <code className="px-2 py-0.5 bg-gray-100 rounded text-sm">
            {product.productCode}
          </code>
        </p>
      </div>

      <ProductForm
        product={serializedProduct}
        categories={categories.map((c: { id: string; name: string }) => ({ id: c.id, name: c.name }))}
        brands={brands.map((b: { id: string; name: string }) => ({ id: b.id, name: b.name }))}
      />
    </div>
  );
}
