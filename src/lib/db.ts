import { PrismaNeon } from '@prisma/adapter-neon'

import { PrismaClient } from '@/generated/prisma/client'

// For development against a local Postgres DB (non-Neon), comment out the PrismaNeon
// block below and uncomment this block (requires `pg` and `@prisma/adapter-pg`):
//
// import { PrismaPg } from '@prisma/adapter-pg'
// import { Pool } from 'pg'
//
// const prismaClientSingleton = () => {
//   const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL
//   const pool = new Pool({ connectionString })
//   const adapter = new PrismaPg(pool)
//   return new PrismaClient({ adapter })
// }

const prismaClientSingleton = () => {
  const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL
  const adapter = new PrismaNeon({ connectionString })
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
