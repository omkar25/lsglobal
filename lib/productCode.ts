import prisma from "@/lib/db";

const PRODUCT_CODE_LENGTH = 8;
const ALPHANUMERIC_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Excluded I, O, 0, 1 to avoid confusion
const MAX_RETRIES = 10;

/**
 * Generates a random alphanumeric character from the allowed set
 */
function getRandomChar(): string {
  const randomIndex = Math.floor(Math.random() * ALPHANUMERIC_CHARS.length);
  return ALPHANUMERIC_CHARS[randomIndex];
}

/**
 * Generates a random 8-character uppercase alphanumeric product code
 * Example: A4K8P2XQ, 9DFK2MPL
 */
export function generateProductCode(): string {
  let code = "";
  for (let i = 0; i < PRODUCT_CODE_LENGTH; i++) {
    code += getRandomChar();
  }
  return code;
}

/**
 * Generates a unique product code that doesn't exist in the database
 * Retries up to MAX_RETRIES times if a duplicate is found
 * @throws Error if unable to generate a unique code after max retries
 */
export async function generateUniqueProductCode(): Promise<string> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const code = generateProductCode();

    const existingProduct = await prisma.product.findUnique({
      where: { productCode: code },
      select: { id: true },
    });

    if (!existingProduct) {
      return code;
    }

    retries++;
  }

  throw new Error(
    `Failed to generate unique product code after ${MAX_RETRIES} attempts`
  );
}

/**
 * Validates if a string is a valid product code format
 * Must be exactly 8 characters, uppercase alphanumeric
 */
export function isValidProductCode(code: string): boolean {
  if (code.length !== PRODUCT_CODE_LENGTH) {
    return false;
  }

  const validPattern = /^[A-Z0-9]{8}$/;
  return validPattern.test(code);
}
