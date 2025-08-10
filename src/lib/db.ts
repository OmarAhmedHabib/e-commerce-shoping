import { PrismaClient } from "@prisma/client"

const prismaGlobal = globalThis as unknown as {
  prisma?: PrismaClient
}

// ✅ أنشئ نسخة واحدة فقط في dev، وواحدة لكل طلب في production
export const db =
  prismaGlobal.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  prismaGlobal.prisma = db
}
