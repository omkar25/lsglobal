import { notFound } from "next/navigation";
import { categoryService } from "@/services";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  
  const [category, allCategories] = await Promise.all([
    categoryService.getCategoryById(id),
    categoryService.getAllCategories(),
  ]);

  if (!category) {
    notFound();
  }

  const parentCategories = allCategories
    .filter((c) => c.id !== id)
    .map((c) => ({ id: c.id, name: c.name }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
        <p className="text-gray-600 mt-1">Update category: {category.name}</p>
      </div>

      <CategoryForm category={category} parentCategories={parentCategories} />
    </div>
  );
}
