// logos
import LinkedIn from "../icons/linkedIn"
import Github from "../icons/github"

import ReactIcon from "../icons/techs/react"
import Nextjs from "@/icons/techs/nextjs";
import Turborepo from "@/icons/techs/turborepo";
import Js from "@/icons/techs/js";
import Ts from "@/icons/techs/ts";
import Css from "@/icons/techs/css";
import Express from "@/icons/techs/express";
import Tailwind from "@/icons/techs/tailwind";
import Ai from "@/icons/techs/ai";
import Bootstrap from "@/icons/techs/bootstrap";
import EmotionCss from "@/icons/techs/emotioncss";
import Firebase from "@/icons/techs/firebase";
import Git from "@/icons/techs/git";
import GithubBig from "@/icons/techs/githubbig";
import Ladle from "@/icons/techs/ladle";
import MySql from "@/icons/techs/mysql";
import Playwright from "@/icons/techs/playwright";
import PostgreSql from "@/icons/techs/postgresql";
import Prisma from "@/icons/techs/prisma";
import Ps from "@/icons/techs/ps";
import Sass from "@/icons/techs/sass";
import ShadcnUi from "@/icons/techs/shadcnui";
import Sql from "@/icons/techs/sql";
import Storybook from "@/icons/techs/storybook";
import StyledComponents from "@/icons/techs/styledcomponents";
import Vercel from "@/icons/techs/vercel";
import Html from "@/icons/techs/html";
import Figma from "@/icons/techs/figma";
import Gitlab from "@/icons/techs/gitlab";
import Node from "@/icons/techs/node";

export const ROUTES = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Tech stack',
    path: '/#tech-stack'
  },
  {
    label: 'Projects',
    path: '/#projects'
  },
  {
    label: 'About me',
    path: '/about-me'
  },
]

export const SOCIAL = [
  {
    name: "LinkedIn",
    href: "https://www.LinkedIn.com/in/francoamoroso/",
    alt: "LinkedIn icon",
    icon: LinkedIn,
  },
  {
    name: "Github",
    href: "https://github.com/Frankovg",
    alt: "Github icon",
    icon: Github,
  },
];

export const CATEGORIES = [
  {
    label: 'Essentials for Web App Development',
    value: 'basics',
    techs: [
      { name: 'React', value: 'react', description: "A JavaScript library for building user interfaces", link: "https://es.react.dev/", icon: ReactIcon },
      { name: 'Next.js', value: 'nextjs', description: "The React Framework – created and maintained by Vercel.", link: "https://nextjs.org/", icon: Nextjs },
      { name: 'Turborepo', value: 'turborepo', description: "A multi-package repository tool for monorepos.", link: "https://turbo.build/", icon: Turborepo },
      { name: 'Typescript', value: 'typescript', description: "A typed superset of JavaScript that compiles to plain JavaScript.", link: "https://www.typescriptlang.org/", icon: Ts },
      { name: 'JavaScript', value: 'javascript', description: "A high-level, interpreted programming language.", link: "https://www.javascript.com/", icon: Js },
      { name: 'HTML', value: 'html', description: "The standard markup language for documents designed to be displayed in a web browser.", link: "https://html.com/", icon: Html },
      { name: 'CSS', value: 'css', description: "A style sheet language used for describing the presentation of a document written in a markup language such as HTML.", link: "https://css3.com/", icon: Css },
      { name: 'Node.js', value: 'node', description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for backend.", link: "https://nodejs.org/en/", icon: Node },
      { name: 'Express', value: 'express', description: "A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.", link: "https://expressjs.com/", icon: Express },
    ]
  },
  {
    label: 'Styling and Related Libraries',
    value: 'styling',
    techs: [
      { name: 'Tailwind', value: 'tailwind', description: "A utility-first CSS framework for rapidly building custom designs.", link: "https://tailwindcss.com/", icon: Tailwind },
      { name: 'Sass', value: 'sass', description: "A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.", link: "https://sass-lang.com/", icon: Sass },
      { name: 'Styled Components', value: 'styledcomponents', description: "A CSS-in-JS library that allows you to write actual CSS code to style your components.", link: "https://styled-components.com/", icon: StyledComponents },
      { name: 'Emotion', value: 'emotioncss', description: "A library designed for writing css styles with JavaScript.", link: "https://emotion.sh/docs/introduction", icon: EmotionCss },
      { name: 'Bootstrap', value: 'bootstrap', description: "A free and open-source CSS framework directed at responsive, mobile-first front-end web development.", link: "https://getbootstrap.com/", icon: Bootstrap },
      { name: 'Shadcn/ui', value: 'shadcnui', description: "A component library for React applications.", link: "https://ui.shadcn.com/", icon: ShadcnUi },
    ]
  },
  {
    label: 'Design and UX/UI tools',
    value: 'design',
    techs: [
      { name: 'Figma', value: 'figma', description: "A vector graphics editor and prototyping tool which is primarily web-based.", link: "https://www.figma.com/", icon: Figma },
      { name: 'Adobe Photoshop', value: 'ps', description: "A raster graphics editor developed and published by Adobe Inc.", link: "https://www.adobe.com/es/products/photoshop/landpa.html?gclid=CjwKCAjw_ZC2BhAQEiwAXSgCljZ7mUGKQ6oPtcPdGQOY2B3qtS_38R4SRQnUjh_rWKBmNxEEHwnL-xoC1zsQAvD_BwE&mv=search&s_kwcid=AL!3085!3!697424706875!e!!g!!photoshop!1445901735!56657232416&mv=search&mv2=paidsearch&sdid=2XBSBWBF&ef_id=CjwKCAjw_ZC2BhAQEiwAXSgCljZ7mUGKQ6oPtcPdGQOY2B3qtS_38R4SRQnUjh_rWKBmNxEEHwnL-xoC1zsQAvD_BwE:G:s&s_kwcid=AL!3085!3!697424706875!e!!g!!photoshop!1445901735!56657232416&gad_source=1", icon: Ps },
      { name: 'Adobe Illustrator', value: 'ai', description: "A vector graphics editor developed and marketed by Adobe Inc.", link: "https://www.adobe.com/es/products/illustrator/campaign/pricing.html?gclid=CjwKCAjw_ZC2BhAQEiwAXSgClpGrbdrcdMPTS6Krw0cjNIqQe2p__gLRxw-dAU2RIsxBkRdmJ2RK7RoCOHoQAvD_BwE&mv=search&mv=search&mv2=paidsearch&sdid=GMCWY69B&ef_id=CjwKCAjw_ZC2BhAQEiwAXSgClpGrbdrcdMPTS6Krw0cjNIqQe2p__gLRxw-dAU2RIsxBkRdmJ2RK7RoCOHoQAvD_BwE:G:s&s_kwcid=AL!3085!3!441886954708!e!!g!!illustrator!1479761001!62724397092&gad_source=1", icon: Ai },
    ]
  },
  {
    label: 'Database Management',
    value: 'db',
    techs: [
      { name: 'SQL', value: 'sql', description: "A domain-specific language used in programming and designed for managing data held in a relational database management system.", link: "https://www.w3schools.com/sql/sql_intro.asp", icon: Sql },
      { name: 'PostgreSQL', value: 'postgresql', description: "A powerful, open source object-relational database system.", link: "https://www.postgresql.org/", icon: PostgreSql },
      { name: 'MySQL', value: 'mysql', description: "An open-source relational database management system.", link: "https://www.mysql.com/", icon: MySql },
      { name: 'Prisma', value: 'prisma', description: "It serves as a bridge between the application and the database, offering a comprehensive toolkit that simplifies database access and management.", link: "https://www.prisma.io/?via=start&gad_source=1", icon: Prisma },
    ]
  },
  {
    label: 'Testing and QA',
    value: 'testing',
    techs: [
      { name: 'Playwright', value: 'playwright', description: "It enables reliable end-to-end testing for modern web apps.", link: "https://playwright.dev/", icon: Playwright },
      { name: 'Ladle', value: 'ladle', description: "A testing library for React applications.", link: "https://ladle.dev/", icon: Ladle },
      { name: 'Storybook', value: 'storybook', description: "An open source tool for developing UI components in isolation for React, Vue, and Angular.", link: "https://storybook.js.org/", icon: Storybook },
    ]
  },
  {
    label: 'Version Control and Deployment',
    value: 'deployment',
    techs: [
      { name: 'Git', value: 'git', description: "A distributed version-control system for tracking changes in source code during software development.", link: "https://git-scm.com/", icon: Git },
      { name: 'Github', value: 'github', description: "GitHub is an online software development platform. It's used for storing, tracking, and collaborating on software projects.", link: "https://github.com/", icon: GithubBig },
      { name: 'Gitlab', value: 'gitlab', description: "A web-based DevOps lifecycle tool that provides a Git repository manager providing wiki, issue-tracking, and CI/CD pipeline features, using an open-source license.", link: "https://about.gitlab.com/", icon: Gitlab },
      { name: 'Vercel', value: 'vercel', description: "A cloud platform for static sites and Serverless Functions.", link: "https://vercel.com/", icon: Vercel },
      { name: 'Firebase', value: 'firebase', description: "A platform developed by Google for creating mobile and web applications.", link: "https://firebase.google.com/", icon: Firebase },
    ]
  }
]