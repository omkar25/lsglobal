"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[];
}

interface Brand {
  id: string;
  name: string;
  slug: string;
}

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
  currentCategorySlug?: string;
  borderless?: boolean;
}

export function ProductFilters({
  categories,
  brands,
  currentCategorySlug,
  borderless = false,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
  });

  const isCategoryPage = currentCategorySlug !== undefined;
  const currentCategory = currentCategorySlug ?? searchParams.get("categorySlug");
  const currentBrand = searchParams.get("brandSlug");
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const selectCategory = (slug: string) => {
    if (isCategoryPage) {
      if (currentCategory === slug) {
        router.push("/products");
      } else {
        router.push(`/c/${slug}`);
      }
    } else {
      updateFilter("categorySlug", currentCategory === slug ? null : slug);
    }
  };

  const clearAllFilters = () => {
    router.push("/products");
  };

  const hasActiveFilters = currentCategory || currentBrand || minPrice || maxPrice;

  return (
    <div
      className={`bg-white rounded-lg p-4 sticky top-4 ${
        borderless ? "" : "shadow-sm border border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-[#D28E45] hover:text-[#C07D35] flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
        >
          <span>Categories</span>
          {expandedSections.categories ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.categories && (
          <div className="space-y-1">
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => selectCategory(category.slug)}
                  className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                    currentCategory === category.slug
                      ? "bg-[#D28E45]/10 text-[#C07D35] font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                </button>
                {category.children && category.children.length > 0 && (
                  <div className="ml-4 mt-1 space-y-1">
                    {category.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => selectCategory(child.slug)}
                        className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                          currentCategory === child.slug
                            ? "bg-[#D28E45]/10 text-[#C07D35] font-medium"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection("brands")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
        >
          <span>Brands</span>
          {expandedSections.brands ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.brands && (
          <div className="space-y-1">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() =>
                  updateFilter("brandSlug", currentBrand === brand.slug ? null : brand.slug)
                }
                className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                  currentBrand === brand.slug
                    ? "bg-[#D28E45]/10 text-[#C07D35] font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
        >
          <span>Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                defaultValue={minPrice}
                onBlur={(e) => updateFilter("minPrice", e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D28E45] focus:border-[#D28E45] outline-none"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                defaultValue={maxPrice}
                onBlur={(e) => updateFilter("maxPrice", e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D28E45] focus:border-[#D28E45] outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
