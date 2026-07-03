import { categoryService } from "@/services";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";

export default async function NewCategoryPage() {
  const categories = await categoryService.getAllCategories();
  const parentCategories = categories.map((c) => ({ id: c.id, name: c.name }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Category</h1>
        <p className="text-gray-600 mt-1">Create a new product category</p>
      </div>

      <CategoryForm parentCategories={parentCategories} />
    </div>
  );
}
