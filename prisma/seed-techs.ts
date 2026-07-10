import 'dotenv/config'

import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

import { PrismaClient } from "../src/generated/prisma/client.js";

import { TECH_STACK_DATA } from "./seed-constants";

// Use direct URL for seeding (non-pooling connection)
const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Additive-only sync of the Tech table. Upsert by `value`; existing rows are
// left untouched (empty update), missing rows are created. Does NOT touch
// categories, projects, users or downloads.
async function main() {
  console.log("Syncing tech stack entries...");
  let created = 0;
  for (const tech of TECH_STACK_DATA) {
    const existing = await prisma.tech.findUnique({ where: { value: tech.value } });
    await prisma.tech.upsert({
      where: { value: tech.value },
      update: {},
      create: tech,
    });
    if (!existing) {
      created++;
      console.log(`  + created ${tech.name} (${tech.value})`);
    }
  }
  console.log(`Tech stack sync finished. ${created} created, ${TECH_STACK_DATA.length - created} already existed.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
