import Link from "next/link";
import { Plus } from "lucide-react";
import { brandService } from "@/services";
import { BrandsTable } from "@/components/admin/brands/BrandsTable";

export default async function AdminBrandsPage() {
  const brands = await brandService.getAllBrands();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-600 mt-1">
            Manage product brands ({brands.length} total)
          </p>
        </div>
        <Link
          href="/admin/brands/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Brand</span>
        </Link>
      </div>

      <BrandsTable brands={brands} />
    </div>
  );
}
