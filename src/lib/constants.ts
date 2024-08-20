
// logos
import LinkedIn from "../icons/linkedIn"
import Github from "../icons/github"

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
      { name: 'React', value: 'react', icon: "./images/react.svg", description: "A JavaScript library for building user interfaces", link: "https://es.react.dev/" },
      { name: 'Next.js', value: 'nextjs', icon: "./images/nextjs.svg", description: "The React Framework – created and maintained by Vercel.", link: "https://nextjs.org/" },
      { name: 'Turborepo', value: 'turborepo', icon: "./images/turborepo.svg", description: "A multi-package repository tool for monorepos.", link: "https://turbo.build/" },
      { name: 'Typescript', value: 'typescript', icon: "./images/ts.svg", description: "A typed superset of JavaScript that compiles to plain JavaScript.", link: "https://www.typescriptlang.org/" },
      { name: 'JavaScript', value: 'javascript', icon: "./images/js.svg", description: "A high-level, interpreted programming language.", link: "https://www.javascript.com/" },
      { name: 'HTML', value: 'html', icon: "./images/html.svg", description: "The standard markup language for documents designed to be displayed in a web browser.", link: "https://html.com/" },
      { name: 'CSS', value: 'css', icon: "./images/css.svg", description: "A style sheet language used for describing the presentation of a document written in a markup language such as HTML.", link: "https://css3.com/" },
      { name: 'Node.js', value: 'node', icon: "./images/node.svg", description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for backend.", link: "https://nodejs.org/en/" },
      { name: 'Express', value: 'express', icon: "./images/express.svg", description: "A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.", link: "https://expressjs.com/" },
    ]
  },
  {
    label: 'Styling and Related Libraries',
    value: 'styling',
    techs: [
      { name: 'Tailwind', value: 'tailwind', icon: "./images/tailwind.svg", description: "A utility-first CSS framework for rapidly building custom designs.", link: "https://tailwindcss.com/" },
      { name: 'Sass', value: 'sass', icon: "./images/sass.svg", description: "A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.", link: "https://sass-lang.com/" },
      { name: 'Styled Components', value: 'styledcomponents', icon: "./images/styledcomponents.svg", description: "A CSS-in-JS library that allows you to write actual CSS code to style your components.", link: "https://styled-components.com/" },
      { name: 'Emotion', value: 'emotioncss', icon: "./images/emotioncss.svg", description: "A library designed for writing css styles with JavaScript.", link: "https://emotion.sh/docs/introduction" },
      { name: 'Bootstrap', value: 'bootstrap', icon: "./images/bootstrap.svg", description: "A free and open-source CSS framework directed at responsive, mobile-first front-end web development.", link: "https://getbootstrap.com/" },
      { name: 'Shadcn/ui', value: 'shadcnui', icon: "./images/shadcnui.svg", description: "A component library for React applications.", link: "https://ui.shadcn.com/" },
    ]
  },
  {
    label: 'Design and UX/UI tools',
    value: 'design',
    techs: [
      { name: 'Figma', value: 'figma', icon: "./images/figma.svg", description: "A vector graphics editor and prototyping tool which is primarily web-based.", link: "https://www.figma.com/" },
      { name: 'Adobe Photoshop', value: 'ps', icon: "./images/ps.svg", description: "A raster graphics editor developed and published by Adobe Inc.", link: "https://www.adobe.com/es/products/photoshop/landpa.html?gclid=CjwKCAjw_ZC2BhAQEiwAXSgCljZ7mUGKQ6oPtcPdGQOY2B3qtS_38R4SRQnUjh_rWKBmNxEEHwnL-xoC1zsQAvD_BwE&mv=search&s_kwcid=AL!3085!3!697424706875!e!!g!!photoshop!1445901735!56657232416&mv=search&mv2=paidsearch&sdid=2XBSBWBF&ef_id=CjwKCAjw_ZC2BhAQEiwAXSgCljZ7mUGKQ6oPtcPdGQOY2B3qtS_38R4SRQnUjh_rWKBmNxEEHwnL-xoC1zsQAvD_BwE:G:s&s_kwcid=AL!3085!3!697424706875!e!!g!!photoshop!1445901735!56657232416&gad_source=1" },
      { name: 'Adobe Illustrator', value: 'ai', icon: "./images/ai.svg", description: "A vector graphics editor developed and marketed by Adobe Inc.", link: "https://www.adobe.com/es/products/illustrator/campaign/pricing.html?gclid=CjwKCAjw_ZC2BhAQEiwAXSgClpGrbdrcdMPTS6Krw0cjNIqQe2p__gLRxw-dAU2RIsxBkRdmJ2RK7RoCOHoQAvD_BwE&mv=search&mv=search&mv2=paidsearch&sdid=GMCWY69B&ef_id=CjwKCAjw_ZC2BhAQEiwAXSgClpGrbdrcdMPTS6Krw0cjNIqQe2p__gLRxw-dAU2RIsxBkRdmJ2RK7RoCOHoQAvD_BwE:G:s&s_kwcid=AL!3085!3!441886954708!e!!g!!illustrator!1479761001!62724397092&gad_source=1" },
    ]
  },
  {
    label: 'Database Management',
    value: 'db',
    techs: [
      { name: 'SQL', value: 'sql', icon: "./images/sql.svg", description: "A domain-specific language used in programming and designed for managing data held in a relational database management system.", link: "https://www.w3schools.com/sql/sql_intro.asp" },
      { name: 'PostgreSQL', value: 'postgresql', icon: "./images/postgresql.svg", description: "A powerful, open source object-relational database system.", link: "https://www.postgresql.org/" },
      { name: 'MySQL', value: 'mysql', icon: "./images/mysql.svg", description: "An open-source relational database management system.", link: "https://www.mysql.com/" },
      { name: 'Prisma', value: 'prisma', icon: "./images/prisma.svg", description: "It serves as a bridge between the application and the database, offering a comprehensive toolkit that simplifies database access and management.", link: "https://www.prisma.io/?via=start&gad_source=1" },
    ]
  },
  {
    label: 'Testing and QA',
    value: 'testing',
    techs: [
      { name: 'Playwright', value: 'playwright', icon: "./images/playwright.svg", description: "It enables reliable end-to-end testing for modern web apps.", link: "https://playwright.dev/" },
      { name: 'Ladle', value: 'ladle', icon: "./images/ladle.svg", description: "A testing library for React applications.", link: "https://ladle.dev/" },
      { name: 'Storybook', value: 'storybook', icon: "./images/storybook.svg", description: "An open source tool for developing UI components in isolation for React, Vue, and Angular.", link: "https://storybook.js.org/" },
    ]
  },
  {
    label: 'Version Control and Deployment',
    value: 'deployment',
    techs: [
      { name: 'Git', value: 'git', icon: "./images/git.svg", description: "A distributed version-control system for tracking changes in source code during software development.", link: "https://git-scm.com/" },
      { name: 'Github', value: 'github', icon: "./images/github_big.svg", description: "GitHub is an online software development platform. It's used for storing, tracking, and collaborating on software projects.", link: "https://github.com/" },
      { name: 'Gitlab', value: 'gitlab', icon: "./images/gitlab.svg", description: "A web-based DevOps lifecycle tool that provides a Git repository manager providing wiki, issue-tracking, and CI/CD pipeline features, using an open-source license.", link: "https://about.gitlab.com/" },
      { name: 'Vercel', value: 'vercel', icon: "./images/versel.svg", description: "A cloud platform for static sites and Serverless Functions.", link: "https://vercel.com/" },
      { name: 'Firebase', value: 'firebase', icon: "./images/firebase.svg", description: "A platform developed by Google for creating mobile and web applications.", link: "https://firebase.google.com/" },
    ]
  }
]