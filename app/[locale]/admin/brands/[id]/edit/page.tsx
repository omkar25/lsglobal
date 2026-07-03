import { notFound } from "next/navigation";
import { brandService } from "@/services";
import { BrandForm } from "@/components/admin/brands/BrandForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBrandPage({ params }: Props) {
  const { id } = await params;
  const brand = await brandService.getBrandById(id);

  if (!brand) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Brand</h1>
        <p className="text-gray-600 mt-1">Update brand: {brand.name}</p>
      </div>

      <BrandForm brand={brand} />
    </div>
  );
}
