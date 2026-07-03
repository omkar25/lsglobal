"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", e.target.value);
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  return (
    <select
      name="sortBy"
      defaultValue={currentSort}
      onChange={handleChange}
      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D28E45] focus:border-[#D28E45] outline-none"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="rating">Highest Rated</option>
      <option value="name_asc">Name: A-Z</option>
    </select>
  );
}
