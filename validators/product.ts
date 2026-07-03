import { z } from "zod";

// ============================================
// ENUMS
// ============================================

export const CurrencySchema = z.enum([
  "USD",
  "EUR",
  "GBP",
  "INR",
  "AED",
  "CAD",
  "AUD",
]);

export const ProductStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const ProductSortFieldSchema = z.enum([
  "newest",
  "oldest",
  "price_asc",
  "price_desc",
  "popularity",
  "rating",
  "name_asc",
  "name_desc",
]);

// ============================================
// PRODUCT IMAGE SCHEMAS
// ============================================

export const CreateProductImageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  alt: z.string().max(255).nullish(),
  sortOrder: z.number().int().min(0).default(0),
  isPrimary: z.boolean().default(false),
  fileId: z.string().nullish(),
  fileName: z.string().nullish(),
});

export const UpdateProductImageSchema = z.object({
  url: z.string().url("Invalid image URL").optional(),
  alt: z.string().max(255).nullish(),
  sortOrder: z.number().int().min(0).optional(),
  isPrimary: z.boolean().optional(),
  fileId: z.string().nullish(),
  fileName: z.string().nullish(),
});

// ============================================
// PRODUCT FEATURE SCHEMAS
// ============================================

export const CreateProductFeatureSchema = z.object({
  title: z.string().min(1, "Feature title is required").max(100),
  value: z.string().min(1, "Feature value is required").max(500),
  sortOrder: z.number().int().min(0).default(0),
});

export const UpdateProductFeatureSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  value: z.string().min(1).max(500).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

// ============================================
// PRODUCT REVIEW SCHEMAS
// ============================================

export const CreateProductReviewSchema = z.object({
  userName: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  title: z.string().max(200).nullish(),
  comment: z.string().max(2000).nullish(),
  productId: z.string().cuid("Invalid product ID"),
});

export const UpdateProductReviewSchema = z.object({
  isApproved: z.boolean().optional(),
  isVerified: z.boolean().optional(),
});

// ============================================
// PRODUCT SCHEMAS
// ============================================

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(255, "Product name cannot exceed 255 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(10000, "Description cannot exceed 10000 characters"),
  shortDescription: z
    .string()
    .min(1, "Short description is required")
    .max(500, "Short description cannot exceed 500 characters"),
  price: z
    .number()
    .min(0, "Price cannot be negative")
    .max(99999999.99, "Price exceeds maximum value"),
  salePrice: z
    .number()
    .positive("Sale price must be greater than 0")
    .max(99999999.99, "Sale price exceeds maximum value")
    .nullish(),
  currency: CurrencySchema.default("USD"),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  stock: z.number().int().min(0, "Stock cannot be negative").default(0),
  sku: z.string().max(100).nullish(),
  metaTitle: z.string().max(70).nullish(),
  metaDescription: z.string().max(160).nullish(),
  brandId: z.string().cuid("Invalid brand ID").nullish(),
  categoryId: z.string().min(1, "Category is required").cuid("Invalid category ID"),
  images: z.array(CreateProductImageSchema).min(1, "At least one image is required"),
  features: z.array(CreateProductFeatureSchema).optional(),
}).refine(
  (data) => {
    if (data.salePrice && data.salePrice >= data.price) {
      return false;
    }
    return true;
  },
  {
    message: "Sale price must be less than regular price",
    path: ["salePrice"],
  }
);

export const UpdateProductSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(10000).nullish(),
  shortDescription: z.string().max(500).nullish(),
  price: z.number().positive().max(99999999.99).optional(),
  salePrice: z.number().positive().max(99999999.99).nullish(),
  currency: CurrencySchema.optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  stock: z.number().int().min(0).optional(),
  sku: z.string().max(100).nullish(),
  metaTitle: z.string().max(70).nullish(),
  metaDescription: z.string().max(160).nullish(),
  brandId: z.string().cuid().nullish(),
  categoryId: z.string().cuid().nullish(),
});

// ============================================
// CATEGORY SCHEMAS
// ============================================

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Category name cannot exceed 100 characters"),
  description: z.string().max(1000).nullish(),
  image: z.string().url("Invalid image URL").nullish(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  parentId: z.string().cuid("Invalid parent category ID").nullish(),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(1000).nullish(),
  image: z.string().url().nullish(),
  sortOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  parentId: z.string().cuid().nullish(),
});

// ============================================
// BRAND SCHEMAS
// ============================================

export const CreateBrandSchema = z.object({
  name: z
    .string()
    .min(1, "Brand name is required")
    .max(100, "Brand name cannot exceed 100 characters"),
  logo: z.string().url("Invalid logo URL").nullish(),
  description: z.string().max(1000).nullish(),
});

export const UpdateBrandSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  logo: z.string().url().nullish(),
  description: z.string().max(1000).nullish(),
});

// ============================================
// QUERY SCHEMAS
// ============================================

export const ProductFiltersSchema = z.object({
  search: z.string().max(100).optional(),
  productCode: z.string().length(8).optional(),
  categoryId: z.string().cuid().optional(),
  categorySlug: z.string().optional(),
  brandId: z.string().cuid().optional(),
  brandSlug: z.string().optional(),
  isPublished: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  isFeatured: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  minPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive())
    .optional(),
  maxPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive())
    .optional(),
  inStock: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  status: ProductStatusSchema.optional(),
});

export const ProductQueryParamsSchema = ProductFiltersSchema.extend({
  page: z
    .string()
    .default("1")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .default("12")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive().max(100)),
  sortBy: ProductSortFieldSchema.default("newest"),
});

// ============================================
// ID VALIDATION
// ============================================

export const IdParamSchema = z.object({
  id: z.string().cuid("Invalid ID format"),
});

export const SlugParamSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
});

export const ProductCodeParamSchema = z.object({
  productCode: z
    .string()
    .length(8, "Product code must be 8 characters")
    .regex(/^[A-Z0-9]{8}$/, "Invalid product code format"),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type CreateProductImageInput = z.infer<typeof CreateProductImageSchema>;
export type UpdateProductImageInput = z.infer<typeof UpdateProductImageSchema>;
export type CreateProductFeatureInput = z.infer<typeof CreateProductFeatureSchema>;
export type UpdateProductFeatureInput = z.infer<typeof UpdateProductFeatureSchema>;
export type CreateProductReviewInput = z.infer<typeof CreateProductReviewSchema>;
export type UpdateProductReviewInput = z.infer<typeof UpdateProductReviewSchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
export type CreateBrandInput = z.infer<typeof CreateBrandSchema>;
export type UpdateBrandInput = z.infer<typeof UpdateBrandSchema>;
export type ProductQueryParamsInput = z.infer<typeof ProductQueryParamsSchema>;
