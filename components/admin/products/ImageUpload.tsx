"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

interface UploadedImage {
  fileId: string;
  fileName: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface ImageUploadProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onImagesChange, maxImages = 10 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setUploadError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const newImages: UploadedImage[] = [];

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "/products");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          newImages.push({
            fileId: result.data.fileId,
            fileName: result.data.fileName,
            url: result.data.url,
            alt: "",
            isPrimary: images.length === 0 && newImages.length === 0,
          });
        } else {
          setUploadError(result.error || "Upload failed");
        }
      } catch (error) {
        console.error("Upload error:", error);
        setUploadError("Failed to upload image");
      }
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
    }

    setIsUploading(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    // If removed image was primary, make first image primary
    if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
      updated[0].isPrimary = true;
    }
    onImagesChange(updated);
  };

  const handleSetPrimary = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onImagesChange(updated);
  };

  const handleAltChange = (index: number, alt: string) => {
    const updated = [...images];
    updated[index].alt = alt;
    onImagesChange(updated);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    // Create a synthetic event to reuse the upload logic
    const input = fileInputRef.current;
    if (input) {
      const dataTransfer = new DataTransfer();
      Array.from(files).forEach((file) => dataTransfer.items.add(file));
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-10 h-10 text-gray-400" />
            <p className="text-gray-600">
              <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500">PNG, JPG, WebP, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {uploadError}
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.fileId || index}
              className={`relative group rounded-lg overflow-hidden border-2 ${
                image.isPrimary ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {/* Image */}
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={image.url}
                  alt={image.alt || "Product image"}
                  fill
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Badge */}
                {image.isPrimary && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                    Primary
                  </span>
                )}
              </div>

              {/* Controls */}
              <div className="p-2 bg-white space-y-2">
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => handleAltChange(index, e.target.value)}
                  placeholder="Alt text"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                {!image.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(index)}
                    className="w-full text-xs text-blue-600 hover:text-blue-700"
                  >
                    Set as primary
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-red-500 py-2">
          <ImageIcon className="w-5 h-5" />
          <span>At least one image is required</span>
        </div>
      )}
    </div>
  );
}
