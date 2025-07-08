import { TECH_STACK_DATA } from "./seed-constants";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// <--------------- PORFOLIO --------------->
const webDevelopment: Prisma.CategoryCreateInput = {
  name: "Web development",
  value: "web-development",
  projects: {
    create: [
      {
        title: "Safeguru 2025",
        shortDescription:
          "Safeguru is an e-commerce platform offering workplace safety products and PPE, serving both B2C customers and B2B clients through Safeguru PRO. Operating in the Spain and Germany with plans for expansion.",
        description: `Safeguru is an e-commerce platform focused on workplace safety products, including PPE and industrial safety gear.
          The project is developed by A-SAFE Digital, part of the UK-based A-SAFE group, known for its innovative safety systems for industrial plants.
          Safeguru serves industries like construction, healthcare, and manufacturing, and is operational in Spain and Germany, with plans for further international expansion.
          In addition to the main platform, Safeguru features side projects such as a commerce admin tool for the sales and marketing team, and Safeguru PRO, a platform tailored for B2B users.
          This combination of tools enhances the experience for both internal teams and business customers, supporting Safeguru’s growth within the A-SAFE group.
          `,
        image:
          "https://drive.google.com/uc?export=view&id=1Mq26Ls9k632W6Bx9B13pyP3aZyXs0zyC",
        slug: "safeguru-2025",
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
        date: new Date("2025-02-15"),
        websiteUrl: "https://safeguru.com",
        company: "A-SAFE Digital",
        companyUrl: "https://asafedigital.com/",
        client: "Safeguru HQ, S.L",
        clientUrl: "https://safeguru.com",
        techStack: {
          connect: [
            { value: "react" },
            { value: "typescript" },
            { value: "nextjs" },
            { value: "tailwind" },
            { value: "storybook" },
            { value: "playwright" },
          ],
        },
        roles: {
          create: [
            {
              label: "Project Lead",
              value: "project-lead",
              percentage: 100,
            },
            {
              label: "Front-end",
              value: "front-end",
              percentage: 95,
            },
            {
              label: "Back-end",
              value: "back-end",
              percentage: 5,
            },
            {
              label: "UI/UX",
              value: "ui-ux",
              percentage: 25,
            },
            {
              label: "QA",
              value: "qa",
              percentage: 50,
            },
          ],
        },
      },
      {
        title: "My Web/Portfolio 2.0",
        shortDescription:
          "Personal portfolio showcasing Franco Amoroso’s work as a front-end developer and former industrial designer. Explore web projects, UI/UX design, and creative experiments blending code and aesthetics.",
        description: `Welcome to my personal website, a full-stack project built to showcase my skills as a front-end developer with a strong design background. 
          This portfolio is developed using cutting-edge technologies like Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Prisma ORM — providing a fast, modern, and fully responsive experience across devices. 
          The site is more than just a static portfolio — it includes a fully featured admin interface, designed like a lightweight CMS. Through this dashboard, I can easily manage and update the content of the site, including projects, skills, and blog posts, without touching the codebase. It’s a custom solution that reflects my approach to building scalable, maintainable applications. 
          If you're curious to see how the admin panel works, you can request access to a sample account. Just head over to the Contact section and drop me a message — I’ll be happy to share the credentials so you can explore the admin experience yourself. Whether you're here to check out my work, connect with me professionally, or test the tech behind the scenes, thanks for visiting!
          `,
        image:
          "https://drive.google.com/uc?export=view&id=1FUMyGYXsD3NcVy293_5K5650JOcO2yqC",
        slug: "safeguru",
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
        date: new Date("2025-07-07"),
        websiteUrl: "https://franamoroso.com",
        repository: "https://github.com/Frankovg/MyWebPortfolio2.0",
        techStack: {
          connect: [
            { value: "react" },
            { value: "typescript" },
            { value: "nextjs" },
            { value: "tailwind" },
            { value: "prisma" },
            { value: "postgresql" },
            { value: "javascript" },
            { value: "playwright" },
            { value: "shadcnui" },
            { value: "javascript" },
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
              percentage: 100,
            },
            {
              label: "DevOps",
              value: "devops",
              percentage: 100,
            },
            {
              label: "Back-end",
              value: "back-end",
              percentage: 100,
            },
          ],
        },
      },
      {
        title: "Safeguru",
        shortDescription:
          "Safeguru is an e-commerce platform offering workplace safety products, serving both B2C and B2B users, with dedicated tools for internal teams and business customers.",
        description: `Safeguru is an e-commerce platform focused on workplace safety products, including PPE and industrial safety gear.
          The project is developed by A-SAFE Digital, part of the UK-based A-SAFE group, known for its innovative safety systems for industrial plants.
          Safeguru serves industries like construction, healthcare, and manufacturing, and is operational in Spain, the UK, and Germany, with plans for further international expansion.
          In addition to the main platform, Safeguru features side projects such as a commerce admin tool for the sales and marketing team, and Safeguru PRO, a platform tailored for B2B users.
          This combination of tools enhances the experience for both internal teams and business customers, supporting Safeguru’s growth within the A-SAFE group.
          `,
        image:
          "https://drive.google.com/uc?export=view&id=1cZFgjn05mh_NgbiCjhKKvDJQesahMbQ1",
        slug: "safeguru",
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
        date: new Date("2023-01-22"),
        websiteUrl: "https://safeguru.co.uk",
        company: "A-SAFE Digital",
        companyUrl: "https://asafedigital.com/",
        client: "Safeguru",
        clientUrl: "https://safeguru.co.uk",
        repository: "https://github.com/Frankovg/theJokesAPI",
        videoUrl:
          "https://www.youtube.com/embed/ROJoLYIi0ZA?si=WJLVWg0SmaQMbOsm",
        videoTitle: "A video title",
        videoDescription: "A video description.",
        techStack: {
          connect: [
            { value: "react" },
            { value: "typescript" },
            { value: "nextjs" },
            { value: "tailwind" },
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
      {
        title: "The Jokes API",
        shortDescription:
          "The Jokes API is a web app offering a selection of random jokes, allowing users to rate, filter by category, and even submit their own jokes for endless entertainment.",
        description:
          "The Jokes API is a web application that takes you on a journey through a world of randomly selected jokes. With the capability to present jokes with a simple click, the app offers a continuous source of amusement. Users can also rate jokes to provide feedback and filter them by categories based on personal preferences. Additionally, if users feel inclined, they can contribute to the collection by submitting their own jokes. In essence, 'The Jokes API' serves as a virtual platform to enjoy, evaluate, and share an endless array of laughter, with jokes selected randomly rather than being auto-generated.",
        image:
          "https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ",
        slug: "the-jokes-api",
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
        date: new Date("2022-12-16"),
        repository: "https://github.com/Frankovg/theJokesAPI",
        videoUrl:
          "https://www.youtube.com/embed/ROJoLYIi0ZA?si=RPZ4DvrVug4e-pM9",
        videoTitle: "A video title",
        videoDescription: "A video description.",
        techStack: {
          connect: [
            {
              value: "react",
            },
            {
              value: "javascript",
            },
            {
              value: "bootstrap",
            },
            {
              value: "sass",
            },
            {
              value: "mysql",
            },
            {
              value: "node",
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
      {
        title: "My old personal web portfolio",
        shortDescription:
          "A portfolio highlighting my work as a front-end developer, built with React, while also showcasing my background in industrial design, graphic design, and UX/UI.",
        description:
          "This is my old personal portfolio, developed to emphasize my skills as a front-end developer. It showcases my expertise in web development, including responsive design, user interfaces, and modern technologies like Next.js and Tailwind. In addition to my software development work, the portfolio reflects my background in industrial design, graphic design, and UX/UI design, offering a well-rounded perspective on creating functional and visually appealing digital products. This platform serves as both a professional showcase and a testament to my journey from design to software development.",
        image:
          "https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ",
        slug: "my-old-personal-web-portfolio",
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
        date: new Date("2023-08-04"),
        techStack: {
          connect: [
            {
              value: "react",
            },
            {
              value: "javascript",
            },
            {
              value: "bootstrap",
            },
            {
              value: "sass",
            },
            {
              value: "firebase",
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
      {
        title: "Netfilm",
        shortDescription:
          "Netfilm is a Netflix clone built to enhance my front-end development skills, featuring a dynamic user interface for browsing and streaming movies and TV shows.",
        description:
          "Netfilm stands as a fully responsive emulation of Netflix, meticulously crafted using React.js and Redux. Notably, for the backend, Firebase was harnessed to facilitate user authentication, streamlining the development process. The movie API employed originates from the renowned 'The Movie Database' (TMDB), enhancing the project's content and functionality.",
        image:
          "https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ",
        slug: "netfilm",
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
        date: new Date("2023-10-18"),
        repository: "https://github.com/Frankovg/netfilm",
        videoUrl: "https://youtu.be/g6nDENxjK3c?si=zmwR7MVnSmXXKGNB",
        videoTitle: "A video title",
        videoDescription: "A video description.",
        techStack: {
          connect: [
            {
              value: "react",
            },
            {
              value: "javascript",
            },
            {
              value: "bootstrap",
            },
            {
              value: "sass",
            },
            {
              value: "firebase",
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
      {
        title: "Coolx",
        shortDescription:
          "An MVP application that leverages AI and machine learning to optimize forestry project management by providing accurate land utilization and forest inventory data.",
        description:
          "This application, developed collaboratively with fellow students, is designed to enhance the management of forestry projects through the use of AI and machine learning technologies. By offering expedited and highly accurate information about land utilization and forest inventory, the application significantly improves overall efficiency in forestry management. Its user-friendly interface allows project managers to make informed decisions, streamline operations, and ultimately promote sustainable forestry practices.",
        image:
          "https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ",
        slug: "coolx",
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
        date: new Date("2023-08-09"),
        repository: "https://github.com/Frankovg/MVP_Coolx",
        videoUrl: "https://youtu.be/BGOv_VQLyyU?si=8wCn8xNe8F_54ulO",
        videoTitle: "A video title",
        videoDescription: "A video description.",
        techStack: {
          connect: [
            {
              value: "react",
            },
            {
              value: "javascript",
            },
            {
              value: "bootstrap",
            },
            {
              value: "sass",
            },
            {
              value: "mysql",
            },
            {
              value: "node",
            },
            {
              value: "express",
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
      {
        title: "DigiArt",
        shortDescription:
          "A social network for digital artists. Users can create profiles, share their work, and connect with other artists, fostering a supportive community for creative collaboration.",
        description:
          "This represents my independent full-stack endeavor, developed over the span of 8 weeks during my bootcamp journey. Crafted solely by me, this project was successfully completed in a mere 3 days. Functioning as an assessment tool, it allows bootcamp participants to gauge their proficiency midway through the program, providing insights into their acquired knowledge.",
        image:
          "https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ",
        slug: "digiart",
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
        date: new Date("2023-06-15"),
        company: "Socratech",
        repository: "https://github.com/Frankovg/proyecto_socratech",
        videoUrl: "https://youtu.be/x851u6-utEU?si=m8Zn362rN7g5YpMr",
        videoTitle: "A video title",
        videoDescription: "A video description.",
        techStack: {
          connect: [
            {
              value: "html",
            },
            {
              value: "css",
            },
            {
              value: "javascript",
            },
            {
              value: "bootstrap",
            },
            {
              value: "sass",
            },
            {
              value: "mysql",
            },
            {
              value: "node",
            },
            {
              value: "express",
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
      {
        title: "Calculator",
        shortDescription:
          "This is my own made calculator built with JavaScript. It has a simple design and is easy to use.",
        description:
          "A calculator meticulously crafted from scratch using JavaScript. This application adeptly handles fundamental mathematical operations such as addition, subtraction, multiplication, and division. Notably, the calculator's functionalities are implemented using pure Vanilla JavaScript, devoid of any reliance on the 'eval()' function for computation.",
        image:
          "https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ",
        slug: "calculator",
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
        date: new Date("2023-05-07"),
        company: "Socratech",
        companyUrl: "https://socratech.es/",
        repository: "https://github.com/Frankovg/Calculator_JS",
        websiteUrl: "https://frankovg.github.io/Calculator_JS/",
        techStack: {
          connect: [
            {
              value: "javascript",
            },
            {
              value: "html",
            },
            {
              value: "css",
            },
            { value: "sass" },
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
      {
        title: "Video Player",
        shortDescription:
          "Made from scratch with JavaScript, this Video Player offers a range of functionalities, including automatic detection of video duration, playback control, and interactive timebar adjustment.",
        description:
          "The Video Player serves as an educational exercise for mastering Vanilla JavaScript. All functionalities within this project are meticulously crafted using JavaScript. Automatic detection of video duration is incorporated seamlessly. Noteworthy features include the ability to advance or rewind by 5 seconds, as well as play and pause functions. Additionally, the timebar is interactive, allowing users to adjust the playback position simply by clicking on it.",
        image:
          "https://drive.google.com/uc?export=view&id=1apoVnfFU6vQwvyW5Po0rVGnHbmmuvEyJ",
        slug: "video-player",
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
        date: new Date("2023-04-21"),
        repository: "https://github.com/Frankovg/video-player",
        websiteUrl: "https://frankovg.github.io/video-player/",
        techStack: {
          connect: [
            {
              value: "javascript",
            },
            {
              value: "html",
            },
            {
              value: "css",
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
