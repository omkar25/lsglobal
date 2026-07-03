import { generateUniqueBrandSlug } from "@/lib/slug";
import { brandRepository } from "@/repositories";
import type { CreateBrandInput, UpdateBrandInput } from "@/validators/product";

// ============================================
// BRAND SERVICE
// ============================================

export class BrandService {
  /**
   * Create a new brand
   */
  async createBrand(input: CreateBrandInput) {
    const nameExists = await brandRepository.nameExists(input.name);
    if (nameExists) {
      throw new Error("Brand with this name already exists");
    }

    const slug = await generateUniqueBrandSlug(input.name);

    return brandRepository.create({
      name: input.name,
      slug,
      logo: input.logo,
      description: input.description,
    });
  }

  /**
   * Update an existing brand
   */
  async updateBrand(id: string, input: UpdateBrandInput) {
    const existingBrand = await brandRepository.findById(id);
    if (!existingBrand) {
      throw new Error("Brand not found");
    }

    let slug = existingBrand.slug;
    if (input.name && input.name !== existingBrand.name) {
      const nameExists = await brandRepository.nameExists(input.name, id);
      if (nameExists) {
        throw new Error("Brand with this name already exists");
      }
      slug = await generateUniqueBrandSlug(input.name, id);
    }

    return brandRepository.update(id, {
      ...input,
      slug,
    });
  }

  /**
   * Delete a brand
   */
  async deleteBrand(id: string) {
    const exists = await brandRepository.exists(id);
    if (!exists) {
      throw new Error("Brand not found");
    }

    return brandRepository.delete(id);
  }

  /**
   * Get brand by ID
   */
  async getBrandById(id: string) {
    return brandRepository.findById(id);
  }

  /**
   * Get brand by slug
   */
  async getBrandBySlug(slug: string) {
    return brandRepository.findBySlug(slug);
  }

  /**
   * Get all brands
   */
  async getAllBrands() {
    return brandRepository.findAll();
  }

  /**
   * Get brands that have published products
   */
  async getBrandsWithProducts() {
    return brandRepository.findWithProducts();
  }

  /**
   * Get brand count
   */
  async getBrandCount() {
    return brandRepository.count();
  }
}

export const brandService = new BrandService();
