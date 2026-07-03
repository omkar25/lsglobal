import { prisma } from "./db";

let isInitialized = false;

/**
 * Initialize database - ensures tables exist
 * Safe to call multiple times, only runs once per server instance
 */
export async function initializeDatabase(): Promise<void> {
  if (isInitialized) {
    return;
  }

  try {
    // Try a simple query to check if database is ready
    await prisma.$queryRaw`SELECT 1`;
    isInitialized = true;
    console.log("✓ Database connection verified");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Failed to connect to database. Please ensure PostgreSQL is running and DATABASE_URL is correct.");
  }
}

/**
 * Check if a table exists in the database
 */
export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const result = await prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = ${tableName}
      ) as exists
    `;
    return result[0]?.exists ?? false;
  } catch {
    return false;
  }
}
