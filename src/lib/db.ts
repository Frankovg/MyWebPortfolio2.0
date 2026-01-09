import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

import { PrismaClient } from '@/generated/prisma/client'

const prismaClientSingleton = () => {
  // Use pooling URL for runtime queries
  const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
