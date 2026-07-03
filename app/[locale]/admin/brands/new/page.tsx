import { BrandForm } from "@/components/admin/brands/BrandForm";

export default function NewBrandPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Brand</h1>
        <p className="text-gray-600 mt-1">Create a new product brand</p>
      </div>

      <BrandForm />
    </div>
  );
}
