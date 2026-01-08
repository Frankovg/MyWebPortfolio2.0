import 'dotenv/config'
import { randomUUID } from "crypto";

import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from "bcrypt";
import { Pool } from 'pg'

import { Prisma, PrismaClient } from "../src/generated/prisma/client.js";


import { TECH_STACK_DATA } from "./seed-constants";
import { CV_EN_SEED, CV_ES_SEED, PORTFOLIO_EN_SEED } from "./seed-download-files";
import { GRAPHIC_AND_UX_UI_DESIGN_SEED } from "./seed-graphic-and-ux-ui-design";
import { INDUSTRIAL_DESIGN_SEED } from "./seed-industrial-design";
import { WEB_DEVELOPMENT_SEED } from "./seed-web-development";

// Use direct URL for seeding (non-pooling connection)
const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// <--------------- PORTFOLIO --------------->
const webDevelopment: Prisma.CategoryCreateInput = WEB_DEVELOPMENT_SEED
const graphicAndUxUiDesign: Prisma.CategoryCreateInput = GRAPHIC_AND_UX_UI_DESIGN_SEED
const industrialDesign: Prisma.CategoryCreateInput = INDUSTRIAL_DESIGN_SEED

// <--------------- DOWNLOADS --------------->
const downloadCVContentEnglish: Prisma.DownloadCreateInput = CV_EN_SEED
const downloadCVContentSpanish: Prisma.DownloadCreateInput = CV_ES_SEED
const downloadPortfolioContentEnglish: Prisma.DownloadCreateInput = PORTFOLIO_EN_SEED

// <--------------- ACCOUNTS (Better Auth format) --------------->
interface UserSeedData {
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
}

const superUserData: UserSeedData = {
  email: process.env.SUPERUSER_ACCOUNT_EMAIL || "",
  name: "Super Admin",
  password: process.env.SUPERUSER_ACCOUNT_PASSWORD || "",
  isAdmin: true,
  isActive: true,
};

const sampleUserData: UserSeedData = {
  email: "sample_admin@franamoroso.com",
  name: "Sample Admin",
  password: "sample_admin",
  isAdmin: false,
  isActive: true,
};

async function createUserWithAccount(userData: UserSeedData) {
  const userId = randomUUID();
  const accountId = randomUUID();
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create user
  await prisma.user.create({
    data: {
      id: userId,
      email: userData.email,
      name: userData.name,
      emailVerified: true,
      isAdmin: userData.isAdmin,
      isActive: userData.isActive,
    },
  });

  // Create credential account with password
  await prisma.account.create({
    data: {
      id: accountId,
      accountId: userId,
      providerId: "credential",
      userId: userId,
      password: hashedPassword,
    },
  });

  return userId;
}

// <--------------- CREATE SCRIPT --------------->
async function main() {
  console.log(`Start seeding ...`);

  console.log("Creating tech stack entries...");
  for (const tech of TECH_STACK_DATA) {
    await prisma.tech.upsert({
      where: { value: tech.value },
      update: {},
      create: tech,
    });
  }
  console.log("Tech stack entries created successfully");

  console.log("Creating categories and projects...");
  await prisma.category.upsert({
    where: { value: webDevelopment.value },
    update: {},
    create: webDevelopment,
  });
  await prisma.category.upsert({
    where: { value: graphicAndUxUiDesign.value },
    update: {},
    create: graphicAndUxUiDesign,
  });
  await prisma.category.upsert({
    where: { value: industrialDesign.value },
    update: {},
    create: industrialDesign,
  });
  console.log("Categories and projects created successfully");

  console.log("Creating accounts (Better Auth format)...");
  // Check if users already exist before creating
  const existingSuperUser = await prisma.user.findUnique({
    where: { email: superUserData.email },
  });
  if (!existingSuperUser) {
    await createUserWithAccount(superUserData);
  } else {
    console.log("Super user already exists, skipping...");
  }

  const existingSampleUser = await prisma.user.findUnique({
    where: { email: sampleUserData.email },
  });
  if (!existingSampleUser) {
    await createUserWithAccount(sampleUserData);
  } else {
    console.log("Sample user already exists, skipping...");
  }
  console.log("Accounts created successfully");

  console.log("Creating download files...");
  const downloads = [downloadCVContentEnglish, downloadPortfolioContentEnglish, downloadCVContentSpanish];
  for (const download of downloads) {
    const existing = await prisma.download.findFirst({
      where: { name: download.name, language: download.language },
    });
    if (!existing) {
      await prisma.download.create({ data: download });
    } else {
      console.log(`Download ${download.name} (${download.language}) already exists, skipping...`);
    }
  }
  console.log("Download files created successfully");

  console.log(`Seeding finished.`);
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
