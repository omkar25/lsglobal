"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

export function ProductFiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = useMemo(() => searchParams.get("search") || "", [searchParams]);
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (sortBy: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch("");
    router.push("/admin/products");
  };

  const hasFilters =
    searchParams.get("search") ||
    searchParams.get("status") ||
    searchParams.get("categoryId") ||
    searchParams.get("brandId");

  return (
    <div className="p-4 border-b border-gray-200 space-y-4">
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </form>

        <select
          value={searchParams.get("status") || ""}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <select
          value={searchParams.get("sortBy") || "newest"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
          <option value="rating">Highest Rated</option>
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
