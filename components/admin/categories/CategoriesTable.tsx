"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
  parentId: string | null;
  parent?: { id: string; name: string } | null;
  _count?: { products: number };
};

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Delete Category?",
      text: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.refresh();
      } else {
        const data = await response.json();
        await Swal.fire({
          title: "Error!",
          text: data.error || "Failed to delete category",
          icon: "error",
        });
      }
    } catch {
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete category",
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 mb-4">No categories found</p>
        <Link
          href="/admin/categories/new"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Create your first category
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Name
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Parent
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Products
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Order
            </th>
            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {category.parent ? (
                  <span className="flex items-center gap-1 text-gray-600">
                    <ChevronRight className="w-4 h-4" />
                    {category.parent.name}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {category._count?.products ?? 0}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    category.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600">{category.sortOrder}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id, category.name)}
                    disabled={deletingId === category.id}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
