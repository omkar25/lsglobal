"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import { createProductAction, updateProductAction } from "@/app/actions/product.actions";
import { ImageUpload } from "@/components/admin/products/ImageUpload";
import { CreateProductSchema } from "@/validators/product";
import type { ProductWithDetails, Currency } from "@/types/product";

interface ProductFormProps {
  product?: ProductWithDetails;
  categories: { id: string; name: string }[];
  brands: { id: string; name: string }[];
}

const currencies: Currency[] = ["USD", "EUR", "GBP", "INR", "AED", "CAD", "AUD"];

export function ProductForm({ product, categories, brands }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    shortDescription: product?.shortDescription || "",
    price: product?.price ? parseFloat(product.price.toString()) : 0,
    salePrice: product?.salePrice ? parseFloat(product.salePrice.toString()) : undefined,
    currency: product?.currency || "USD",
    stock: product?.stock || 0,
    sku: product?.sku || "",
    metaTitle: product?.metaTitle || "",
    metaDescription: product?.metaDescription || "",
    categoryId: product?.categoryId || "",
    brandId: product?.brandId || "",
    isPublished: product?.isPublished || false,
    isFeatured: product?.isFeatured || false,
  });

  const [features, setFeatures] = useState<{ title: string; value: string }[]>(
    product?.features?.map((f) => ({ title: f.title, value: f.value })) || []
  );

  const [images, setImages] = useState<{ fileId: string; fileName: string; url: string; alt: string; isPrimary: boolean }[]>(
    product?.images?.map((img) => ({
      fileId: (img as { fileId?: string }).fileId || "",
      fileName: img.url.split("/").pop() || "",
      url: img.url,
      alt: img.alt || "",
      isPrimary: img.isPrimary,
    })) || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // Prepare data for validation
    const data = {
      ...formData,
      salePrice: formData.salePrice || null,
      categoryId: formData.categoryId || null,
      brandId: formData.brandId || null,
      sku: formData.sku || null,
      metaTitle: formData.metaTitle || null,
      metaDescription: formData.metaDescription || null,
      features: features
        .filter((f) => f.title && f.value)
        .map((f, index) => ({ ...f, sortOrder: index })),
      images: images
        .filter((img) => img.url)
        .map((img, index) => ({
          url: img.url,
          alt: img.alt || null,
          sortOrder: index,
          isPrimary: img.isPrimary,
          fileId: img.fileId || null,
          fileName: img.fileName || null,
        })),
    };

    // Validate with Zod
    const validation = CreateProductSchema.safeParse(data);
    
    if (!validation.success) {
      const errors: Record<string, string> = {};
      const zodErrors = validation.error.flatten().fieldErrors;
      Object.entries(zodErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          errors[field] = messages[0];
        }
      });
      setFieldErrors(errors);
      setError("Please fix the validation errors below");
      setIsLoading(false);
      return;
    }

    try {
      const result = product
        ? await updateProductAction(product.id, validation.data)
        : await createProductAction(validation.data);

      if (result.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const details = (result as { details?: Record<string, string[] | undefined> }).details;
        if (details) {
          const errors: Record<string, string> = {};
          Object.entries(details).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
              errors[field] = messages[0];
            }
          });
          setFieldErrors(errors);
        }
        setError(result.error || "An error occurred");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const addFeature = () => {
    setFeatures([...features, { title: "", value: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, field: "title" | "value", value: string) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Basic Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                    fieldErrors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.name && <p className="mt-0.5 text-xs text-red-500">{fieldErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  maxLength={500}
                  className={`w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                    fieldErrors.shortDescription ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.shortDescription && <p className="mt-0.5 text-xs text-red-500">{fieldErrors.shortDescription}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className={`w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                    fieldErrors.description ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.description && <p className="mt-0.5 text-xs text-red-500">{fieldErrors.description}</p>}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className={`bg-white rounded-lg shadow-sm border p-4 ${
            fieldErrors.images ? "border-red-500" : "border-gray-200"
          }`}>
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              Images <span className="text-red-500">*</span>
            </h2>
            <ImageUpload images={images} onImagesChange={setImages} />
            {fieldErrors.images && <p className="mt-2 text-xs text-red-500">{fieldErrors.images}</p>}
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-900">Features</h2>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1 px-2 py-0.5 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, "title", e.target.value)}
                    placeholder="Name"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    value={feature.value}
                    onChange={(e) => updateFeature(index, "value", e.target.value)}
                    placeholder="Value"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {features.length === 0 && (
                <p className="text-gray-400 text-center text-xs py-2">No features</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4">
          {/* Category & Brand */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Organization</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className={`w-full px-2 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none ${
                    fieldErrors.categoryId ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Select</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {fieldErrors.categoryId && <p className="mt-0.5 text-xs text-red-500">{fieldErrors.categoryId}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
                <select
                  value={formData.brandId}
                  onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Pricing</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                  className={`w-full px-2 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none ${
                    fieldErrors.price ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.price && <p className="mt-0.5 text-xs text-red-500">{fieldErrors.price}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Sale Price</label>
                <input
                  type="number"
                  value={formData.salePrice || ""}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                  min="0"
                  step="0.01"
                  className={`w-full px-2 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none ${
                    fieldErrors.salePrice ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.salePrice && <p className="mt-0.5 text-xs text-red-500">{fieldErrors.salePrice}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value as Currency })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {currencies.map((curr) => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Status</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Featured</span>
              </label>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">SEO</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Meta Title</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  maxLength={70}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  maxLength={160}
                  rows={2}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{product ? "Update" : "Create"}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
