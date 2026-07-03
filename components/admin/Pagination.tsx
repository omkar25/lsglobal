"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationMeta } from "@/types/product";

interface PaginationProps {
  meta: PaginationMeta;
}

export function Pagination({ meta }: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, meta.page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(meta.totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Showing {(meta.page - 1) * meta.limit + 1} to{" "}
        {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
      </p>

      <div className="flex items-center gap-1">
        <Link
          href={createPageUrl(meta.page - 1)}
          className={`p-2 rounded-lg ${
            meta.hasPrevPage
              ? "text-gray-700 hover:bg-gray-100"
              : "text-gray-300 pointer-events-none"
          }`}
          aria-disabled={!meta.hasPrevPage}
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>

        {startPage > 1 && (
          <>
            <Link
              href={createPageUrl(1)}
              className="px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              1
            </Link>
            {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
          </>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`px-3 py-1 rounded-lg ${
              page === meta.page
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        ))}

        {endPage < meta.totalPages && (
          <>
            {endPage < meta.totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <Link
              href={createPageUrl(meta.totalPages)}
              className="px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {meta.totalPages}
            </Link>
          </>
        )}

        <Link
          href={createPageUrl(meta.page + 1)}
          className={`p-2 rounded-lg ${
            meta.hasNextPage
              ? "text-gray-700 hover:bg-gray-100"
              : "text-gray-300 pointer-events-none"
          }`}
          aria-disabled={!meta.hasNextPage}
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
