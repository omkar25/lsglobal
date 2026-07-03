"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

type Brand = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  _count?: { products: number };
};

interface BrandsTableProps {
  brands: Brand[];
}

export function BrandsTable({ brands }: BrandsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Delete Brand?",
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
      const response = await fetch(`/api/admin/brands/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await Swal.fire({
          title: "Deleted!",
          text: "Brand has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.refresh();
      } else {
        const data = await response.json();
        await Swal.fire({
          title: "Error!",
          text: data.error || "Failed to delete brand",
          icon: "error",
        });
      }
    } catch {
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete brand",
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (brands.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 mb-4">No brands found</p>
        <Link
          href="/admin/brands/new"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Create your first brand
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
              Brand
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Description
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Products
            </th>
            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {brands.map((brand) => (
            <tr key={brand.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-10 h-10 rounded-lg object-contain bg-gray-100"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-semibold">
                      {brand.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{brand.name}</p>
                    <p className="text-sm text-gray-500">{brand.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-gray-600 truncate max-w-xs">
                  {brand.description || "—"}
                </p>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {brand._count?.products ?? 0}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/brands/${brand.id}/edit`}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(brand.id, brand.name)}
                    disabled={deletingId === brand.id}
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
