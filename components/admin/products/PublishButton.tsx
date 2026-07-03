"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { publishProductAction, unpublishProductAction } from "@/app/actions/product.actions";

interface PublishButtonProps {
  productId: string;
  isPublished: boolean;
}

export function PublishButton({ productId, isPublished }: PublishButtonProps) {
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(isPublished);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (published) {
        await unpublishProductAction(productId);
        setPublished(false);
      } else {
        await publishProductAction(productId);
        setPublished(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
        published
          ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
          : "bg-green-100 text-green-700 hover:bg-green-200"
      }`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : published ? (
        <EyeOff className="w-4 h-4" />
      ) : (
        <Eye className="w-4 h-4" />
      )}
      <span>{published ? "Unpublish" : "Publish"}</span>
    </button>
  );
}
