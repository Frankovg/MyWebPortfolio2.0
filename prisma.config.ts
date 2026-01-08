import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Use direct URL for migrations (non-pooling connection)
    url: process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL,
  },
})
