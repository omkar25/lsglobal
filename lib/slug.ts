import prisma from "@/lib/db";

/**
 * Converts a string to a URL-friendly slug
 * Example: "MacBook Air M4" -> "macbook-air-m4"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars except -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

/**
 * Generates a unique product slug
 * If the slug already exists, appends -2, -3, etc.
 * @param name - The product name to generate slug from
 * @param excludeId - Optional product ID to exclude from duplicate check (for updates)
 */
export async function generateUniqueProductSlug(
  name: string,
  excludeId?: string
): Promise<string> {
  const baseSlug = slugify(name);

  if (!baseSlug) {
    throw new Error("Cannot generate slug from empty name");
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId && { NOT: { id: excludeId } }),
      },
      select: { id: true },
    });

    if (!existingProduct) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

/**
 * Generates a unique category slug
 * If the slug already exists, appends -2, -3, etc.
 * @param name - The category name to generate slug from
 * @param excludeId - Optional category ID to exclude from duplicate check (for updates)
 */
export async function generateUniqueCategorySlug(
  name: string,
  excludeId?: string
): Promise<string> {
  const baseSlug = slugify(name);

  if (!baseSlug) {
    throw new Error("Cannot generate slug from empty name");
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug,
        ...(excludeId && { NOT: { id: excludeId } }),
      },
      select: { id: true },
    });

    if (!existingCategory) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

/**
 * Generates a unique brand slug
 * If the slug already exists, appends -2, -3, etc.
 * @param name - The brand name to generate slug from
 * @param excludeId - Optional brand ID to exclude from duplicate check (for updates)
 */
export async function generateUniqueBrandSlug(
  name: string,
  excludeId?: string
): Promise<string> {
  const baseSlug = slugify(name);

  if (!baseSlug) {
    throw new Error("Cannot generate slug from empty name");
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingBrand = await prisma.brand.findFirst({
      where: {
        slug,
        ...(excludeId && { NOT: { id: excludeId } }),
      },
      select: { id: true },
    });

    if (!existingBrand) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

/**
 * Validates if a string is a valid slug format
 */
export function isValidSlug(slug: string): boolean {
  const validPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return validPattern.test(slug);
}
