import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const webDevelopment: Prisma.CategoryCreateInput = {
  name: 'Web development',
  value: 'web-development',
  projects: {
    create: [
      {
        title: "Testing Data",
        shortDescription: "This is a test project",
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        image: 'https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ',
        slug: 'testing-data',
        gallery: {
          create: [
            {
              imageUrl: 'https://drive.google.com/uc?export=view&id=1W8j6OVaZpjLPzl3KvDXzR0xH1rHBFm-W',
            },
            {
              imageUrl: 'https://drive.google.com/uc?export=view&id=1s0HTMzJChlsEhnyBX5dNrRBXv-HVZAdI',
            },
            {
              imageUrl: 'https://drive.google.com/uc?export=view&id=1xsf1ISCp1t2dPvR_9Ds_Jj2t3vrXetdx',
            },
          ]
        },
        websiteUrl: 'https://safeguru.co.uk',
        company: 'A-SAFE Digital',
        client: 'Safeguru',
        techStack: 'Next.js, TypeScript, Tailwind'
      },
      {
        title: "Testing Data 2",
        shortDescription: "This is a test 2 project",
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        image: 'https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ',
        slug: 'testing-data-2',
        gallery: {
          create: [
            {
              imageUrl: 'https://drive.google.com/uc?export=view&id=1W8j6OVaZpjLPzl3KvDXzR0xH1rHBFm-W',
            },
            {
              imageUrl: 'https://drive.google.com/uc?export=view&id=1s0HTMzJChlsEhnyBX5dNrRBXv-HVZAdI',
            },
            {
              imageUrl: 'https://drive.google.com/uc?export=view&id=1xsf1ISCp1t2dPvR_9Ds_Jj2t3vrXetdx',
            },
          ]
        },
        websiteUrl: 'https://safeguru.co.uk',
        company: 'A-SAFE Digital',
        client: 'Safeguru',
        techStack: 'Next.js, TypeScript, Tailwind'
      },
    ]
  }
}

const graphicAndUxUiDesign: Prisma.CategoryCreateInput = {
  name: 'Graphic & UX/UI Design',
  value: 'graphic-design',
  projects: {
    create: [
      {
        title: "Testing Data 3",
        shortDescription: "This is a test 3 project",
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        image: 'https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ',
        slug: 'testing-data-3',
        gallery: {
          create: [
            {
              imageUrl: 'https://drive.google.com/uc?export=view&id=1W8j6OVaZpjLPzl3KvDXzR0xH1rHBFm-W',
            },
            {
              imageUrl: 'https://drive.google.com/uc?export=view&id=1s0HTMzJChlsEhnyBX5dNrRBXv-HVZAdI',
            },
            {
              imageUrl: 'https://drive.google.com/uc?export=view&id=1xsf1ISCp1t2dPvR_9Ds_Jj2t3vrXetdx',
            },
          ]
        },
        websiteUrl: 'https://safeguru.co.uk',
        company: 'A-SAFE Digital',
        client: 'Safeguru',
        techStack: 'Next.js, TypeScript, Tailwind'
      }
    ]
  }
}

const industrialDesign: Prisma.CategoryCreateInput = {
  name: 'Industrial Design',
  value: 'industrial-design',
}

async function main() {
  console.log(`Start seeding ...`)

  await prisma.category.create({
    data: webDevelopment,
  })
  await prisma.category.create({
    data: graphicAndUxUiDesign,
  })
  await prisma.category.create({
    data: industrialDesign,
    include: {
      projects: true
    }
  })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
