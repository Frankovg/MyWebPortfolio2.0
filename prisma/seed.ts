import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { TECH_STACK_DATA } from "./seed-constants";
import { CV_EN_SEED, CV_ES_SEED, PORTFOLIO_EN_SEED } from "./seed-download-files";
import { GRAPHIC_AND_UX_UI_DESIGN_SEED } from "./seed-graphic-and-ux-ui-design";
import { INDUSTRIAL_DESIGN_SEED } from "./seed-industrial-design";
import { WEB_DEVELOPMENT_SEED } from "./seed-web-development";

const prisma = new PrismaClient();

// <--------------- PORTFOLIO --------------->
const webDevelopment: Prisma.CategoryCreateInput = WEB_DEVELOPMENT_SEED
const graphicAndUxUiDesign: Prisma.CategoryCreateInput = GRAPHIC_AND_UX_UI_DESIGN_SEED
const industrialDesign: Prisma.CategoryCreateInput = INDUSTRIAL_DESIGN_SEED

// <--------------- DOWNLOADS --------------->
const downloadCVContentEnglish: Prisma.DownloadCreateInput = CV_EN_SEED
const downloadCVContentSpanish: Prisma.DownloadCreateInput = CV_ES_SEED
const downloadPortfolioContentEnglish: Prisma.DownloadCreateInput = PORTFOLIO_EN_SEED

// <--------------- ACCOUNTS --------------->
const superUserAccount: Prisma.UserCreateInput = {
  email: process.env.SUPERUSER_ACCOUNT_EMAIL || "",
  hashedpassword: process.env.SUPERUSER_ACCOUNT_PASSWORD || "",
  isAdmin: true,
};

const sampleUserAccount: Prisma.UserCreateInput = {
  email: "sample_admin@franamoroso.com",
  hashedpassword: "sample_admin",
};

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
  await prisma.category.create({
    data: webDevelopment,
  });
  await prisma.category.create({
    data: graphicAndUxUiDesign,
  });
  await prisma.category.create({
    data: industrialDesign,
    include: {
      projects: true,
    },
  });
  console.log("Categories and projects created successfully");

  console.log("Creating accounts...");
  const hashedSuperuserPassword = await bcrypt.hash(
    superUserAccount.hashedpassword,
    10
  );
  superUserAccount.hashedpassword = hashedSuperuserPassword;
  const hashedSampleUserPassword = await bcrypt.hash(
    sampleUserAccount.hashedpassword,
    10
  );
  sampleUserAccount.hashedpassword = hashedSampleUserPassword;
  console.log("Creating accounts...");
  await prisma.user.create({
    data: superUserAccount,
  });
  await prisma.user.create({
    data: sampleUserAccount,
  });
  console.log("Accounts created successfully");

  console.log("Creating download files...");
  await prisma.download.create({
    data: downloadCVContentEnglish,
  });
  await prisma.download.create({
    data: downloadPortfolioContentEnglish,
  });
  await prisma.download.create({
    data: downloadCVContentSpanish,
  });
  console.log("Download files created successfully");

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
