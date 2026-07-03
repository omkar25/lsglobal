import { NextRequest } from "next/server";
import { uploadToImageKit } from "@/lib/imagekit";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";

/**
 * POST /api/upload
 * Upload image to ImageKit
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "/products";

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse("Invalid file type. Allowed: JPEG, PNG, WebP, GIF", 400);
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return errorResponse("File size exceeds 10MB limit", 400);
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const base64File = `data:${file.type};base64,${base64}`;

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}_${originalName}`;

    // Upload to ImageKit
    const result = await uploadToImageKit(base64File, fileName, folder);

    return successResponse({
      fileId: result.fileId,
      fileName: result.fileName,
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return serverErrorResponse(error);
  }
}
