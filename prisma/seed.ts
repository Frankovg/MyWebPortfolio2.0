import { TECH_STACK_DATA } from "./seed-constants";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { WEB_DEVELOPMENT } from "./seed-web-development";

const prisma = new PrismaClient();

// <--------------- PORTFOLIO --------------->
const webDevelopment: Prisma.CategoryCreateInput = WEB_DEVELOPMENT

const graphicAndUxUiDesign: Prisma.CategoryCreateInput = {
  name: "Graphic & UX/UI Design",
  value: "graphic-design",
  projects: {
    create: [
      {
        title: "Testing Data 3",
        shortDescription: "This is a test 3 project",
        description:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        image:
          "https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ",
        slug: "testing-data-3",
        gallery: {
          create: [
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1W8j6OVaZpjLPzl3KvDXzR0xH1rHBFm-W",
              alt: "This is a meta description of the picture.",
              description: "This is a description of the picture.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1s0HTMzJChlsEhnyBX5dNrRBXv-HVZAdI",
              alt: "This is a meta description of the picture.",
              description: "This is a description of the picture.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1xsf1ISCp1t2dPvR_9Ds_Jj2t3vrXetdx",
              alt: "This is a meta description of the picture.",
              description: "This is a description of the picture.",
            },
          ],
        },
        date: new Date("2022-01-22"),
        websiteUrl: "https://safeguru.co.uk",
        company: "A-SAFE Digital",
        companyUrl: "https://asafedigital.com/",
        client: "Safeguru",
        clientUrl: "https://safeguru.co.uk",
        techStack: {
          connect: [
            {
              value: "nextjs",
            },
            {
              value: "typescript",
            },
            {
              value: "tailwind",
            },
          ],
        },
        roles: {
          create: [
            {
              label: "Front-end",
              value: "front-end",
              percentage: 100,
            },
            {
              label: "UI/UX",
              value: "ui-ux",
              percentage: 40,
            },
            {
              label: "Project Lead",
              value: "project-lead",
              percentage: 100,
            },
            {
              label: "DevOps",
              value: "devops",
              percentage: 3,
            },
            {
              label: "Back-end",
              value: "back-end",
              percentage: 5,
            },
            {
              label: "Data Specialist",
              value: "data-specialist",
              percentage: 1,
            },
          ],
        },
      },
    ],
  },
};

const industrialDesign: Prisma.CategoryCreateInput = {
  name: "Industrial Design",
  value: "industrial-design",
};

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
  description: "Portfolio featuring my best design and development projects.",
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
