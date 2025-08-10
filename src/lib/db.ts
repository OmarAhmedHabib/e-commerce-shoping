import { PrismaClient } from "@prisma/client";

// نستخدم متغير عام لتجنب إعادة إنشاء PrismaClient في بيئة التطوير (Hot Reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// إنشاء النسخة أو استخدام الموجودة
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// تخزين النسخة في global في بيئة التطوير فقط
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
