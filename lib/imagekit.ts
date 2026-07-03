import ImageKit from "imagekit";

let imagekitInstance: ImageKit | null = null;

function getImageKit(): ImageKit {
  if (imagekitInstance) return imagekitInstance;

  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error(
      "ImageKit configuration missing. Please set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT environment variables."
    );
  }

  imagekitInstance = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });

  return imagekitInstance;
}

export const imagekit = {
  get instance() {
    return getImageKit();
  },
  getAuthenticationParameters() {
    return getImageKit().getAuthenticationParameters();
  },
  upload(options: Parameters<ImageKit["upload"]>[0]) {
    return getImageKit().upload(options);
  },
  deleteFile(fileId: string) {
    return getImageKit().deleteFile(fileId);
  },
};

export const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

/**
 * Generate authentication parameters for client-side uploads
 */
export function getImageKitAuthParams() {
  const token = imagekit.getAuthenticationParameters();
  return {
    ...token,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  };
}

/**
 * Upload image to ImageKit from server
 * @param file - Base64 encoded file or URL
 * @param fileName - Name for the file
 * @param folder - Folder path in ImageKit
 */
export async function uploadToImageKit(
  file: string,
  fileName: string,
  folder: string = "/products"
): Promise<{ fileId: string; fileName: string; url: string; thumbnailUrl: string }> {
  try {
    const response = await imagekit.upload({
      file,
      fileName,
      folder,
      useUniqueFileName: true,
    });

    return {
      fileId: response.fileId,
      fileName: response.name,
      url: response.url,
      thumbnailUrl: response.thumbnailUrl || response.url,
    };
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw new Error("Failed to upload image to ImageKit");
  }
}

/**
 * Delete image from ImageKit
 * @param fileId - ImageKit file ID
 */
export async function deleteFromImageKit(fileId: string): Promise<void> {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    console.error("ImageKit delete error:", error);
    throw new Error("Failed to delete image from ImageKit");
  }
}

/**
 * Get optimized image URL with transformations
 * @param fileName - The file name/path in ImageKit
 * @param options - Transformation options
 */
export function getImageUrl(
  fileName: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "jpg" | "png";
  } = {}
): string {
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || "";
  const transformations: string[] = [];

  if (options.width) transformations.push(`w-${options.width}`);
  if (options.height) transformations.push(`h-${options.height}`);
  if (options.quality) transformations.push(`q-${options.quality}`);
  if (options.format) transformations.push(`f-${options.format}`);

  const transformString = transformations.length > 0 ? `tr:${transformations.join(",")}/` : "";

  return `${urlEndpoint}/${transformString}${fileName}`;
}
