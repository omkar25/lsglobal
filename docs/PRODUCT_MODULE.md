# Product Module Documentation

## Overview

This is a production-ready eCommerce Product module built with:
- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Backend**: Next.js API Routes + Server Actions
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod
- **Image Storage**: ImageKit.io

## Setup Instructions

### 1. Configure Environment Variables

Add the following to your `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lsglobal?schema=public"

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_imagekit_id"

# Admin Authentication
ADMIN_USERNAME="lsglobaladmin"
ADMIN_PASSWORD="your_secure_password"
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### 4. Seed Database (Optional)

Create a seed file at `prisma/seed.ts` if needed.

## Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── lib/
│   ├── db.ts                  # Prisma client singleton
│   ├── productCode.ts         # Product code generation
│   ├── slug.ts                # Slug generation utilities
│   └── api-response.ts        # API response helpers
├── types/
│   └── product.ts             # TypeScript types & DTOs
├── validators/
│   └── product.ts             # Zod validation schemas
├── repositories/
│   ├── product.repository.ts
│   ├── productImage.repository.ts
│   ├── productFeature.repository.ts
│   ├── productReview.repository.ts
│   ├── category.repository.ts
│   ├── brand.repository.ts
│   └── index.ts
├── services/
│   ├── product.service.ts
│   ├── category.service.ts
│   ├── brand.service.ts
│   ├── review.service.ts
│   └── index.ts
├── app/
│   ├── actions/
│   │   └── product.actions.ts  # Server Actions
│   ├── api/
│   │   ├── admin/
│   │   │   ├── products/       # Admin product APIs
│   │   │   ├── categories/     # Admin category APIs
│   │   │   ├── brands/         # Admin brand APIs
│   │   │   └── reviews/        # Admin review APIs
│   │   └── shop/
│   │       ├── products/       # Public product APIs
│   │       ├── categories/     # Public category APIs
│   │       └── brands/         # Public brand APIs
│   └── [locale]/
│       ├── admin/
│       │   ├── layout.tsx
│       │   ├── page.tsx        # Dashboard
│       │   └── products/       # Admin product pages
│       ├── products/
│       │   └── page.tsx        # Shop products listing
│       └── product/
│           └── [slug]/
│               └── page.tsx    # Product detail page
└── components/
    ├── admin/
    │   ├── Pagination.tsx
    │   └── products/
    │       ├── ProductsTable.tsx
    │       ├── ProductFiltersBar.tsx
    │       ├── ProductForm.tsx
    │       └── PublishButton.tsx
    └── shop/
        ├── ProductGrid.tsx
        ├── ProductFilters.tsx
        ├── ProductGallery.tsx
        ├── ProductInfo.tsx
        ├── ProductFeatures.tsx
        ├── ProductReviews.tsx
        └── RelatedProducts.tsx
```

## Database Models

### Product
- Unique 8-character alphanumeric product code (auto-generated)
- Auto-generated slug from name
- Support for regular price and sale price
- Multiple currencies (USD, EUR, GBP, INR, AED, CAD, AUD)
- Stock management
- SEO fields (meta title, meta description)
- Status: DRAFT, PUBLISHED, ARCHIVED

### ProductImage
- Multiple images per product
- Primary image flag
- Sort order support
- Cascade delete with product

### ProductFeature
- Key-value pairs (e.g., Color: Black)
- Sort order support
- Cascade delete with product

### ProductReview
- Rating (1-5)
- Approval workflow
- Verified purchase flag
- Cascade delete with product

### Category
- Hierarchical (parent-child) structure
- Active/inactive status
- Sort order support

### Brand
- Unique name and slug
- Logo support

## API Endpoints

### Admin APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/products` | List products with filters |
| POST | `/api/admin/products` | Create product |
| GET | `/api/admin/products/[id]` | Get product by ID |
| PATCH | `/api/admin/products/[id]` | Update product |
| DELETE | `/api/admin/products/[id]` | Delete product |
| POST | `/api/admin/products/[id]/publish` | Publish product |
| DELETE | `/api/admin/products/[id]/publish` | Unpublish product |
| GET | `/api/admin/products/[id]/images` | Get product images |
| POST | `/api/admin/products/[id]/images` | Add product image |
| PATCH | `/api/admin/products/[id]/images/[imageId]` | Update image |
| DELETE | `/api/admin/products/[id]/images/[imageId]` | Delete image |
| GET | `/api/admin/products/[id]/features` | Get product features |
| POST | `/api/admin/products/[id]/features` | Add feature |
| PUT | `/api/admin/products/[id]/features` | Bulk update features |
| PATCH | `/api/admin/products/[id]/features/[featureId]` | Update feature |
| DELETE | `/api/admin/products/[id]/features/[featureId]` | Delete feature |
| GET | `/api/admin/categories` | List categories |
| POST | `/api/admin/categories` | Create category |
| GET | `/api/admin/categories/[id]` | Get category |
| PATCH | `/api/admin/categories/[id]` | Update category |
| DELETE | `/api/admin/categories/[id]` | Delete category |
| GET | `/api/admin/brands` | List brands |
| POST | `/api/admin/brands` | Create brand |
| GET | `/api/admin/brands/[id]` | Get brand |
| PATCH | `/api/admin/brands/[id]` | Update brand |
| DELETE | `/api/admin/brands/[id]` | Delete brand |
| GET | `/api/admin/reviews` | List reviews |
| GET | `/api/admin/reviews/[id]` | Get review |
| DELETE | `/api/admin/reviews/[id]` | Delete review |
| POST | `/api/admin/reviews/[id]/approve` | Approve review |
| DELETE | `/api/admin/reviews/[id]/approve` | Reject review |

### Shop APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shop/products` | List published products |
| GET | `/api/shop/products/featured` | Get featured products |
| GET | `/api/shop/products/[slug]` | Get product by slug |
| GET | `/api/shop/products/[slug]/reviews` | Get product reviews |
| POST | `/api/shop/products/[slug]/reviews` | Submit review |
| GET | `/api/shop/products/[slug]/related` | Get related products |
| GET | `/api/shop/categories` | List active categories |
| GET | `/api/shop/brands` | List brands with products |

## Query Parameters

### Product Listing

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 12, max: 100) |
| search | string | Search by name, description, or code |
| productCode | string | Filter by exact product code |
| categoryId | string | Filter by category ID |
| categorySlug | string | Filter by category slug |
| brandId | string | Filter by brand ID |
| brandSlug | string | Filter by brand slug |
| isPublished | boolean | Filter by published status |
| isFeatured | boolean | Filter by featured status |
| minPrice | number | Minimum price filter |
| maxPrice | number | Maximum price filter |
| inStock | boolean | Filter in-stock products |
| status | string | Filter by status (DRAFT, PUBLISHED, ARCHIVED) |
| sortBy | string | Sort field (newest, oldest, price_asc, price_desc, rating, name_asc, name_desc) |

## Best Practices Implemented

1. **Repository Pattern**: Data access layer abstraction
2. **Service Layer**: Business logic separation
3. **DTOs**: Type-safe data transfer objects
4. **Zod Validation**: Runtime validation with TypeScript inference
5. **Prisma Transactions**: Atomic database operations
6. **Error Handling**: Consistent error responses
7. **Clean Architecture**: SOLID principles
8. **Cascade Deletes**: Automatic cleanup of related data
9. **Database Indexes**: Optimized query performance
10. **Unique Constraints**: Data integrity enforcement

## Optimization Suggestions

1. **Caching**: Implement Redis caching for frequently accessed data
2. **Image Optimization**: Use Next.js Image component with CDN
3. **Search**: Consider Elasticsearch for advanced search
4. **Rate Limiting**: Add rate limiting to public APIs
5. **Authentication**: Integrate NextAuth.js for admin protection
6. **Logging**: Add structured logging (e.g., Pino)
7. **Monitoring**: Implement APM (e.g., Sentry, DataDog)
8. **Testing**: Add unit and integration tests
9. **CI/CD**: Set up automated deployment pipeline
10. **Database**: Consider read replicas for scaling
