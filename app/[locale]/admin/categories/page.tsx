import Link from "next/link";
import { Plus } from "lucide-react";
import { categoryService } from "@/services";
import { CategoriesTable } from "@/components/admin/categories/CategoriesTable";

export default async function AdminCategoriesPage() {
  const categories = await categoryService.getAllCategories();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">
            Manage product categories ({categories.length} total)
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </Link>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
