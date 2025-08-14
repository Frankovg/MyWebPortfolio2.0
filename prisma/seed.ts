import { TECH_STACK_DATA } from "./seed-constants";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { WEB_DEVELOPMENT_SEED } from "./seed-web-development";
import { GRAPHIC_AND_UX_UI_DESIGN_SEED } from "./seed-graphic-and-ux-ui-design";
import { INDUSTRIAL_DESIGN_SEED } from "./seed-industrial-design";

const prisma = new PrismaClient();

// <--------------- PORTFOLIO --------------->
const webDevelopment: Prisma.CategoryCreateInput = WEB_DEVELOPMENT_SEED
const graphicAndUxUiDesign: Prisma.CategoryCreateInput = GRAPHIC_AND_UX_UI_DESIGN_SEED
const industrialDesign: Prisma.CategoryCreateInput = INDUSTRIAL_DESIGN_SEED

// <--------------- DOWNLOADS --------------->
const downloadCVContent: Prisma.DownloadCreateInput = {
  name: "Curriculum Vitae",
  description: "Download my CV to view my experience and technical skills.",
  fileHref:
    "https://drive.google.com/file/d/1IOwsxqChdt0bWAtnU5dXfpqcK6L6ZKLG/view?usp=sharing",
  format: "pdf",
  imageUrl:
    "https://drive.google.com/uc?export=view&id=1G2GI_0xFul8Q5BWFMzGQQa9uxulTFWN8",
  alt: "Download Curriculum Vitae background",
  isActive: true,
};

const downloadPortfolioContent: Prisma.DownloadCreateInput = {
  name: "Portfolio",
  description: "Portfolio featuring my best projects.",
  fileHref:
    "https://drive.google.com/file/d/1tz6N79mJ8EbAG5iS6VFSI797q8CxqTox/view?usp=sharing",
  format: "pdf",
  imageUrl:
    "https://drive.google.com/uc?export=view&id=14_nyeEJF3As0lPMk3GCaY0uONRIOF1QN",
  alt: "Download Portfolio background",
  isActive: true,
};

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

  console.log("Creating downloads...");
  await prisma.download.create({
    data: downloadCVContent,
  });
  await prisma.download.create({
    data: downloadPortfolioContent,
  });
  console.log("Downloads created successfully");

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
