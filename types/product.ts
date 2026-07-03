// Decimal type from Prisma - will be available after running `npx prisma generate`
type Decimal = { toString(): string } | number;

// ============================================
// ENUMS
// ============================================

export type Currency = "USD" | "EUR" | "GBP" | "INR" | "AED" | "CAD" | "AUD";
export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

// ============================================
// BASE TYPES (matching Prisma models)
// ============================================

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryWithChildren extends Category {
  children: Category[];
  parent: Category | null;
}

export interface Product {
  id: string;
  productCode: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  price: Decimal;
  salePrice: Decimal | null;
  currency: Currency;
  status: ProductStatus;
  isPublished: boolean;
  isFeatured: boolean;
  stock: number;
  sku: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  brandId: string | null;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  isPrimary: boolean;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFeature {
  id: string;
  title: string;
  value: string;
  sortOrder: number;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductReview {
  id: string;
  userName: string;
  email: string;
  rating: number;
  title: string | null;
  comment: string | null;
  isApproved: boolean;
  isVerified: boolean;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// EXTENDED TYPES (with relations)
// ============================================

export interface ProductWithRelations extends Product {
  brand: Brand | null;
  category: Category | null;
  images: ProductImage[];
  features: ProductFeature[];
  reviews: ProductReview[];
}

export interface ProductWithDetails extends Product {
  brand: Brand | null;
  category: CategoryWithChildren | null;
  images: ProductImage[];
  features: ProductFeature[];
  reviews: ProductReview[];
  averageRating: number;
  reviewCount: number;
}

export interface ProductListItem {
  id: string;
  productCode: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: Decimal;
  salePrice: Decimal | null;
  currency: Currency;
  status: ProductStatus;
  isPublished: boolean;
  isFeatured: boolean;
  stock: number;
  brand: { id: string; name: string; slug: string } | null;
  category: { id: string; name: string; slug: string } | null;
  primaryImage: ProductImage | null;
  averageRating: number;
  reviewCount: number;
  createdAt: Date;
}

// ============================================
// DTOs - CREATE
// ============================================

export interface CreateProductDTO {
  name: string;
  description?: string | null;
  shortDescription?: string | null;
  price: number;
  salePrice?: number | null;
  currency?: Currency;
  isPublished?: boolean;
  isFeatured?: boolean;
  stock?: number;
  sku?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  brandId?: string | null;
  categoryId?: string | null;
  images?: CreateProductImageDTO[];
  features?: CreateProductFeatureDTO[];
}

export interface CreateProductImageDTO {
  url: string;
  alt?: string | null;
  sortOrder?: number;
  isPrimary?: boolean;
}

export interface CreateProductFeatureDTO {
  title: string;
  value: string;
  sortOrder?: number;
}

export interface CreateProductReviewDTO {
  userName: string;
  email: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
  productId: string;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string | null;
  image?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  parentId?: string | null;
}

export interface CreateBrandDTO {
  name: string;
  logo?: string | null;
  description?: string | null;
}

// ============================================
// DTOs - UPDATE
// ============================================

export interface UpdateProductDTO {
  name?: string;
  description?: string | null;
  shortDescription?: string | null;
  price?: number;
  salePrice?: number | null;
  currency?: Currency;
  isPublished?: boolean;
  isFeatured?: boolean;
  stock?: number;
  sku?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  brandId?: string | null;
  categoryId?: string | null;
}

export interface UpdateProductImageDTO {
  url?: string;
  alt?: string | null;
  sortOrder?: number;
  isPrimary?: boolean;
}

export interface UpdateProductFeatureDTO {
  title?: string;
  value?: string;
  sortOrder?: number;
}

export interface UpdateProductReviewDTO {
  isApproved?: boolean;
  isVerified?: boolean;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string | null;
  image?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  parentId?: string | null;
}

export interface UpdateBrandDTO {
  name?: string;
  logo?: string | null;
  description?: string | null;
}

// ============================================
// QUERY TYPES
// ============================================

export type ProductSortField =
  | "newest"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | "popularity"
  | "rating"
  | "name_asc"
  | "name_desc";

export interface ProductFilters {
  search?: string;
  productCode?: string;
  categoryId?: string;
  categorySlug?: string;
  brandId?: string;
  brandSlug?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  status?: ProductStatus;
}

export interface ProductQueryParams extends ProductFilters {
  page?: number;
  limit?: number;
  sortBy?: ProductSortField;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}
