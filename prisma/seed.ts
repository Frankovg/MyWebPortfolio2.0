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
          As the Project Lead, I was responsible for overseeing the entire development lifecycle, coordinating a multidisciplinary team, and ensuring that project goals and deadlines were met. My role included defining technical requirements, managing task prioritization, and leading the development of the frontend to deliver a high-quality user experience.
          `,
        image:
          "https://drive.google.com/uc?export=view&id=1Mq26Ls9k632W6Bx9B13pyP3aZyXs0zyC",
        slug: "safeguru-2025",
        gallery: {
          create: [
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1dnv5iNhc5QMOBsv0y7qvhpyUJK8FRXd9",
              alt: "Homepage of Safeguru website showcasing their video banner and navigation menu.",
              description:
                "The Safeguru homepage features a prominent hero section, followed by dedicated sections highlighting the company’s services and background. Visitors can easily explore featured products and top brands, while the navigation bar offers a comprehensive category explorer for seamless browsing.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1ETphpHNli9nnXOL3MewB-16NUg-5JtBz",
              alt: "Product list page of Safeguru website showcasing their working clothes products.",
              description:
                "The Safeguru product list page displays a wide selection of workwear items, organized in a grid of product cards. At the top, users can browse subcategories with illustrated icons for different types of clothing.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1qs3fC3T85wWZrvGQUMKZr96xMxw7bh4U",
              alt: "Product details page of Safeguru website showcasing a jacket and its details.",
              description:
                "The Safeguru product detail page showcases high-quality images of the selected item, along with detailed product information, pricing, and descriptions. Users can view and select from available color and size variants, and easily add the product to their cart.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=17DhzVaAiV6TPaXU93gTyW5F1Bo1jQd3J",
              alt: "Cart page of Safeguru website.",
              description:
                "The Safeguru cart page streamlines the purchasing process, allowing users to review and manage their selected items before checkout. It emphasizes transparency in pricing and payment options, supports promotional discounts, and reinforces trust with secure payment integrations and customer guarantees.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1PeZaI49RSCXy3ZyhcuW-8Ynl3tBqA_4w",
              alt: "Checkout page of Safeguru website.",
              description:
                "The Safeguru checkout page is designed to simplify order completion by guiding users through address confirmation, shipping selection, and secure payment options. The layout prioritizes clarity and efficiency, minimizing friction and building trust at the final stage of the purchase journey.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=11bKbPBZh3OkJ4Oi0V6gSuDKIGsye7cT4",
              alt: "User account page of Safeguru website.",
              description:
                'The screenshot shows the Safeguru account page with the "My Orders" tab active, displaying a list of recent purchases and their statuses. In addition to tracking orders, users can also navigate to sections for managing personal details, viewing returns, and updating their address book, making account management simple and convenient.',
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=14ptwgmV8VyfuJOGP6kLZXOe4hSyeeLeW",
              alt: "Homepage of Safeguru website with the main menu opened showing the product categories.",
              description:
                "The screenshot highlights the Safeguru category menu explorer, which provides users with a comprehensive, multi-column dropdown for quickly navigating the full range of product categories. This menu is designed to facilitate efficient product discovery, enabling users to browse by type, use case, or safety requirement directly from the main navigation bar.",
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
              percentage: 10,
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
            {
              label: "Data Specialist",
              value: "data-specialist",
              percentage: 5,
            },
            {
              label: "DevOps",
              value: "devops",
              percentage: 8,
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
              percentage: 80,
            },
            {
              label: "Data Specialist",
              value: "data-specialist",
              percentage: 40,
            },
            {
              label: "QA",
              value: "qa",
              percentage: 75,
            },
          ],
        },
      },
      {
        title: "Safeguru (Old version)",
        shortDescription:
          "Safeguru (deprecated) is the original version of the e-commerce platform for workplace safety products, which previously served B2C and B2B markets with first-generation tools for internal teams and business customers.",
        description: `Safeguru is the original e-commerce platform for workplace safety products, including PPE and industrial safety gear, developed by A-SAFE Digital (part of the UK-based A-SAFE group). 
          Launched nearly 5 years ago, this legacy version served industries such as construction, healthcare, and manufacturing across Spain and Germany. 
          Alongside the main platform, it included tools for internal teams and Safeguru PRO for B2B clients, supporting both business growth and operational needs within the A-SAFE group.
          I began my journey on this project as a junior frontend developer, contributing to the implementation of the user interface and collaborating closely with the development team. Over time, I took on increasing responsibility, ultimately advancing to the role of project lead. In this capacity, I oversaw the full development lifecycle, coordinated cross-functional teams, and guided the project through key milestones and platform evolution.
          `,
        image:
          "https://drive.google.com/uc?export=view&id=1cZFgjn05mh_NgbiCjhKKvDJQesahMbQ1",
        slug: "safeguru-old",
        gallery: {
          create: [
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=12_E-ym_FBTlR0cXYTAh4MqakoEhIttdU",
              alt: "Old Safeguru's homepage.",
              description: "The homepage features a modern e-commerce design focused on workplace safety products. The overall layout is clean and professional, emphasizing safety equipment and easy navigation for users.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=10Qm47Fxwzb9a0hIEIZYcJ9fqxZhewHyZ",
              alt: "Products list page of the old Safeguru website.",
              description: "The product list page displays a clean, grid-based layout. At the top, users can filter products by category, brand, color, size, and industry using prominent filter buttons. The design emphasizes clarity and ease of navigation, allowing users to quickly browse and compare workplace safety clothing options.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1a8w70V3k0AmZSJ8dYUPbapD644-9Ueq1",
              alt: "Product detail page of the old Safeguru website.",
              description: "The page features high-quality images and detailed product information. The design emphasizes clarity and ease of navigation, helping customers make informed purchasing decisions.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1qeWOl244IAcJ1YXJFqYNimv_dzCS_c8D",
              alt: "Cart page of the old Safeguru website.",
              description: "The cart page features a clean, user-friendly layout with a summary of the selected product.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1iDH1OcnVFPmgtvtQRerudYgnmh-SEk0q",
              alt: "Checkout page of the old Safeguru website.",
              description: "The checkout page provides a streamlined and intuitive experience, guiding users through each step of the purchase process.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1H41okP2Kh9NObG-2kv9gOiHpt97BYzEF",
              alt: "My orders section of the old Safeguru website.",
              description: "The use account page offers a centralized dashboard for managing personal information, viewing order history, handling returns, and maintaining address details. Users can easily access detailed order information and track updates, ensuring transparency and convenience throughout their shopping experience.",
            },
          ],
        },
        date: new Date("2023-01-22"),
        company: "A-SAFE Digital",
        companyUrl: "https://asafedigital.com/",
        client: "Safeguru",
        clientUrl: "https://safeguru.com",
        techStack: {
          connect: [
            { value: "react" },
            { value: "typescript" },
            { value: "nextjs" },
            { value: "tailwind" },
            { value: "styledcomponents" },
            { value: "emotioncss" },
            { value: "ladle" },
            { value: "figma" },
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
              percentage: 80,
            },
            {
              label: "Project Lead",
              value: "project-lead",
              percentage: 70,
            },
            {
              label: "Back-end",
              value: "back-end",
              percentage: 5,
            },
            {
              label: "DevOps",
              value: "devops",
              percentage: 5,
            },
            {
              label: "Data Specialist",
              value: "data-specialist",
              percentage: 3,
            },
            {
              label: "QA",
              value: "qa",
              percentage: 15,
            },
          ],
        },
      },
      {
        title: "Petsoft",
        shortDescription:
          "The Jokes API is a web app offering a selection of random jokes, allowing users to rate, filter by category, and even submit their own jokes for endless entertainment.",
        description: `This is a modern full-stack web application designed to help pet owners, veterinarians, and caretakers efficiently manage the animals under their care. 
          With a clean, user-friendly interface, PetSoft allows users to keep track of medical records, visits, vaccinations, treatments, and more — all in one centralized and accessible place.
          From a technical perspective, PetSoft is built using Next.js and TypeScript for a robust and scalable frontend architecture. Styling is handled with Tailwind CSS, ensuring a responsive and maintainable UI. The backend is powered by Prisma ORM, interfacing with a relational database to ensure secure and performant data handling.
          A key feature of the app is its admin dashboard, which works as a custom CMS. Through this panel, administrators can manage pets, users, veterinarians, and view complete medical histories. Visitors can also request access to a sample account to explore the administrator panel and test its capabilities — just reach out via the contact section on the site.
          Please note: PetSoft is a demo and training project, not a real commercial product.
        `,
        image:
          "https://drive.google.com/uc?export=view&id=1dfIJ7iNWoOokTHsUQDan-qxWjIEoXe4T",
        slug: "petsoft",
        gallery: {
          create: [
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1WOiKZa67oYJo-feB5SGJV71JPkNhs8My",
              alt: "Petsoft landing page.",
              description: "The PetSoft landing page features a modern, minimalist design with a clear focus on usability.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1iiLFfiI_pvt_Bu3nh64XfUsRc7X8mQwn",
              alt: "Petsoft main dashboard.",
              description: "The main dashboard of PetSoft presents a clean, intuitive interface for managing pets in daycare. The design emphasizes usability and clarity, making it easy to view and update pet records.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=16KcUWjWwvTGHPBGRn7-W-Dj6E68X2PUl",
              alt: "Petsoft form to edit a pet detail.",
              description: "The edit/add pet form is presented in a modal overlay, offering a straightforward interface for updating pet details. The design ensures quick, efficient management of pet records within the dashboard.",
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1qLL2DAMtiMp_eNfhj0mPo54KpETDd4uE",
              alt: "Petsoft checkout.",
              description: "The payment section provides a clear, secure checkout experience for purchasing access to the app. The interface is powered by Stripe and clearly marked as test mode, emphasizing that this is part of a demo and training project, not a real commercial product.",
            },
          ],
        },
        date: new Date("2025-07-07"),
        repository: "https://github.com/Frankovg/petsoft-fran",
        websiteUrl: "https://petsoft-fran.vercel.app/",
        techStack: {
          connect: [
            {
              value: "react",
            },
            {
              value: "typescript",
            },
            {
              value: "tailwind",
            },
            {
              value: "nextjs",
            },
            {
              value: "prisma",
            },
            {
              value: "shadcnui",
            },
            {
              value: "vercel",
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
              percentage: 10,
            },
            {
              label: "DevOps",
              value: "devops",
              percentage: 100,
            },
            {
              label: "Back-end",
              value: "back-end",
              percentage: 90,
            },
            {
              label: "Data Specialist",
              value: "data-specialist",
              percentage: 80,
            },
            {
              label: "DevOps",
              value: "devops",
              percentage: 80,
            },
            {
              label: "QA",
              value: "qa",
              percentage: 5,
            },
          ],
        },
      },
      {
        title: "The Jokes API",
        shortDescription:
          "The Jokes API is a fun and interactive web app that delivers random jokes, lets users rate them, filter by category, and even contribute their own — making laughter just a click away.",
        description: `It is a playful web app built with React that delivers a steady stream of randomly selected jokes. 
          With a single click, users can discover new jokes, filter them by category to match their sense of humor, and rate each one to share feedback. 
          Feeling inspired? Add your own punchlines to the mix and keep the laughs rolling. Whether you’re here to chuckle, contribute, or explore, The Jokes API turns humor into an easy‑to‑use, endlessly entertaining experience.
        `,
        image:
          "https://drive.google.com/uc?export=view&id=1ueG8BcTJdwuBof0SNlfmWFmXyNr4lwc9",
        slug: "the-jokes-api",
        gallery: {
          create: [
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1aDuRWsQtfwbz45kNJBPWuLOBcgbB5XWE",
              alt: "The Jokes API interface showcasing a random joke.",
              description: 'The Jokes API interface features a playful, hand-drawn design with a simple layout. At the top, users can search for jokes by keyword, as shown in the right screenshot with the word "car." Jokes are displayed with their category and punchline, and users can reveal the punchline with a button (active in the left screenshot, disabled in the right after reveal).',
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1p5IKqc2ErTS88qOB5CzKtNP4VSFQENuF",
              alt: "A Figma screenshot of The Jokes API design.",
              description: "The Jokes API design, as shown in the Figma screenshot, uses a playful, hand-drawn aesthetic with sketch-like borders and handwritten fonts. The interface is simple and approachable, featuring clear sections for searching, viewing, and submitting jokes. The overall style emphasizes fun and creativity, making the user experience lighthearted and engaging.",
            },
          ],
        },
        date: new Date("2022-12-16"),
        repository: "https://github.com/Frankovg/theJokesAPI",
        videoUrl:
          "https://www.youtube.com/embed/ROJoLYIi0ZA?si=RPZ4DvrVug4e-pM9",
        videoTitle: "Let's find some jokes!",
        videoDescription:
          "In this demo, you'll see how users can easily browse random jokes, filter them by category, rate their favorites, and even submit their own. The interface is simple, responsive, and designed for smooth interaction, offering a fun and engaging user experience. Whether you're just looking for a laugh or want to contribute to the collection, The Jokes API makes it easy and enjoyable.",
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
            {
              value: "figma",
            },
            {
              value: "sql",
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
              percentage: 100,
            },
            {
              label: "Back-end",
              value: "back-end",
              percentage: 100,
            },
            {
              label: "DevOps",
              value: "devops",
              percentage: 80,
            },
            {
              label: "Data Specialist",
              value: "data-specialist",
              percentage: 40,
            },
            {
              label: "QA",
              value: "qa",
              percentage: 5,
            },
          ],
        },
      },
      {
        title: "My portfolio (first version)",
        shortDescription:
          "A previous iteration of my personal website, highlighting my evolution and proficiency as a front-end developer. It stands as a testament to my expertise in web development with React, and integrates my background in industrial and graphic design, alongside UX/UI design.",
        description: `This is a previous version of my personal portfolio, fully developed with React, created to showcase my evolution as a front-end developer.
          It highlights key competencies in responsive web design, interactive user interfaces, and modern development tools and frameworks. 
          While the site itself was built before my transition to Next.js and Tailwind, it demonstrates a solid grasp of component-based architecture and UI best practices.
          Beyond code, this portfolio reflects my multidisciplinary background — combining experience in industrial design, graphic design, and UX/UI — to present a holistic view of how I approach digital product creation. It’s not only a record of my earlier work but also a visual narrative of my growth from creative design to full-fledged front-end development.
          `,
        image:
          "https://drive.google.com/uc?export=view&id=1-GhKyl6KZr10pCnTW07BDgINV_zMoDui",
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
        repository: "https://github.com/Frankovg/MyWebPortfolio",
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
              value: "node",
            },
            {
              value: "express",
            },
            {
              value: "firebase",
            },
            {
              value: "figma",
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
              percentage: 80,
            },
            {
              label: "DevOps",
              value: "devops",
              percentage: 40,
            },
            {
              label: "Back-end",
              value: "back-end",
              percentage: 80,
            },
            {
              label: "Data Specialist",
              value: "data-specialist",
              percentage: 3,
            },
            {
              label: "QA",
              value: "qa",
              percentage: 5,
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
