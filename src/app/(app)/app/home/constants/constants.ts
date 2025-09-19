import {
  Ai,
  Node,
  Bootstrap,
  Css,
  EmotionCss,
  Express,
  Figma,
  Firebase,
  Git,
  GithubBig,
  Gitlab,
  Html,
  Js,
  Ladle,
  MySql,
  Nextjs,
  Playwright,
  PostgreSql,
  Prisma,
  Ps,
  ReactIcon,
  Sass,
  ShadcnUi,
  Sql,
  Storybook,
  StyledComponents,
  Tailwind,
  Ts,
  Turborepo,
  Vercel,
  Jest,
  CorelDraw,
  Rhinoceros,
  AutodeskMax,
  SolidWorks,
  VRay,
  Copilot,
  ClaudeCode
} from "@/icons/techs"

export const BASICS_TECHS = {
  react: {
    name: 'React',
    value: 'react',
    description: "A JavaScript library for building user interfaces",
    link: "https://es.react.dev/",
    icon: ReactIcon
  },
  nextjs: {
    name: 'Next.js',
    value: 'nextjs',
    description: "The React Framework – created and maintained by Vercel.",
    link: "https://nextjs.org/",
    icon: Nextjs
  },
  turborepo: {
    name: 'Turborepo',
    value: 'turborepo',
    description: "A multi-package repository tool for monorepos.",
    link: "https://turbo.build/",
    icon: Turborepo
  },
  typescript: {
    name: 'Typescript',
    value: 'typescript',
    description: "A typed superset of JavaScript that compiles to plain JavaScript.",
    link: "https://www.typescriptlang.org/",
    icon: Ts
  },
  claudecode: {
    name: 'Claude Code',
    value: 'claudecode',
    description: "Claude is a next generation AI assistant built by Anthropic and trained to be safe, accurate, and secure to help you do your best work.",
    link: "https://claude.com/",
    icon: ClaudeCode
  },
  copilot: {
    name: 'Github Copilot',
    value: 'copilot',
    description: "GitHub Copilot is a coding assistant powered by Artificial Intelligence (AI), which can run in various environments and help you be more efficient in your daily coding tasks.",
    link: "https://copilot.microsoft.com/",
    icon: Copilot
  },
  javascript: {
    name: 'JavaScript',
    value: 'javascript',
    description: "A high-level, interpreted programming language.",
    link: "https://www.javascript.com/",
    icon: Js
  },
  html: {
    name: 'HTML',
    value: 'html',
    description: "The standard markup language for documents designed to be displayed in a web browser.",
    link: "https://html.com/",
    icon: Html
  },
  css: {
    name: 'CSS',
    value: 'css',
    description: "A style sheet language used for describing the presentation of a document written in a markup language such as HTML.",
    link: "https://css3.com/",
    icon: Css
  },
  node: {
    name: 'Node.js',
    value: 'node',
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for backend.",
    link: "https://nodejs.org/en/",
    icon: Node
  },
  express: {
    name: 'Express',
    value: 'express',
    description: "A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
    link: "https://expressjs.com/",
    icon: Express
  }
}

export const STYLING_TECHS = {
  tailwind: {
    name: 'Tailwind',
    value: 'tailwind',
    description: "A utility-first CSS framework for rapidly building custom designs.",
    link: "https://tailwindcss.com/",
    icon: Tailwind
  },
  sass: {
    name: 'Sass',
    value: 'sass',
    description: "A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.",
    link: "https://sass-lang.com/",
    icon: Sass
  },
  styledcomponents: {
    name: 'Styled Components',
    value: 'styledcomponents',
    description: "A CSS-in-JS library that allows you to write actual CSS code to style your components.",
    link: "https://styled-components.com/",
    icon: StyledComponents
  },
  emotioncss: {
    name: 'Emotion',
    value: 'emotioncss',
    description: "A library designed for writing css styles with JavaScript.",
    link: "https://emotion.sh/docs/introduction",
    icon: EmotionCss
  },
  bootstrap: {
    name: 'Bootstrap',
    value: 'bootstrap',
    description: "A free and open-source CSS framework directed at responsive, mobile-first front-end web development.",
    link: "https://getbootstrap.com/",
    icon: Bootstrap
  },
  shadcnui: {
    name: 'Shadcn/ui',
    value: 'shadcnui',
    description: "A component library for React applications.",
    link: "https://ui.shadcn.com/",
    icon: ShadcnUi
  }
}

export const DESIGN_TECHS = {
  figma: {
    name: 'Figma',
    value: 'figma',
    description: "A vector graphics editor and prototyping tool which is primarily web-based.",
    link: "https://www.figma.com/",
    icon: Figma
  },
  ps: {
    name: 'Adobe Photoshop',
    value: 'ps',
    description: "A vector graphics editor and prototyping tool which is primarily web-based.",
    link: "https://www.adobe.com/products/photoshop.html",
    icon: Ps
  },
  ai: {
    name: 'Adobe Illustrator',
    value: 'ai',
    description: "A vector graphics editor and prototyping tool which is primarily web-based.",
    link: "https://www.adobe.com/products/illustrator.html",
    icon: Ai
  },
  corel: {
    name: 'CorelDraw',
    value: 'corel',
    description: "Is a vector graphics editor primarily used for creating and editing vector-based illustrations, logos, brochures, and other graphic design materials.",
    link: "https://www.coreldraw.com/la/",
    icon: CorelDraw
  },
  rhinoceros: {
    name: 'Rhinoceros',
    value: 'rhinoceros',
    description: "Is a 3D computer graphics and computer-aided design (CAD) application software.",
    link: "https://www.rhino3d.com/es/",
    icon: Rhinoceros
  },
  autodeskMax: {
    name: 'Autodesk 3DS MAX',
    value: 'autodeskMax',
    description: "Is a professional 3D computer graphics program used for creating 3D animations, models, and images.",
    link: "https://www.autodesk.com/es/products/3ds-max/overview",
    icon: AutodeskMax
  },
  solidworks: {
    name: 'SolidWorks',
    value: 'solidworks',
    description: "Is a 3D CAD (Computer-Aided Design) and CAE (Computer-Aided Engineering) software developed by Dassault Systèmes.",
    link: "https://www.solidworks.com/",
    icon: SolidWorks
  },
  vray: {
    name: 'V-Ray',
    value: 'vray',
    description: " is a rendering engine, meaning it's software used to create realistic images from 3D models.",
    link: "https://www.chaos.com/es/vray?srsltid=AfmBOoqkbEr8WmXtoEN3ZMW1-8LOsELH-ewx1wmVf6kx9S3mFFhbajaP",
    icon: VRay
  }
}

export const DB_TECHS = {
  sql: {
    name: 'SQL',
    value: 'sql',
    description: "A domain-specific language used in programming and designed for managing data held in a relational database management system.",
    link: "https://www.w3schools.com/sql/sql_intro.asp",
    icon: Sql
  },
  postgresql: {
    name: 'PostgreSQL',
    value: 'postgresql',
    description: "A powerful, open source object-relational database system.",
    link: "https://www.postgresql.org/",
    icon: PostgreSql
  },
  mysql: {
    name: 'MySQL',
    value: 'mysql',
    description: "An open-source relational database management system.",
    link: "https://www.mysql.com/",
    icon: MySql
  },
  prisma: {
    name: 'Prisma',
    value: 'prisma',
    description: "It serves as a bridge between the application and the database, offering a comprehensive toolkit that simplifies database access and management.",
    link: "https://www.prisma.io/?via=start&gad_source=1",
    icon: Prisma
  }
}

export const TESTING_TECHS = {
  playwright: {
    name: 'Playwright',
    value: 'playwright',
    description: "It enables reliable end-to-end testing for modern web apps.",
    link: "https://playwright.dev/",
    icon: Playwright
  },
  ladle: {
    name: 'Ladle',
    value: 'ladle',
    description: "A testing library for React applications.",
    link: "https://ladle.dev/",
    icon: Ladle
  },
  storybook: {
    name: 'Storybook',
    value: 'storybook',
    description: "An open source tool for developing UI components in isolation for React, Vue, and Angular.",
    link: "https://storybook.js.org/",
    icon: Storybook
  },
  jest: {
    name: 'Jest',
    value: 'jest',
    description: "Jest is a JavaScript testing framework, primarily used for unit testing React and JavaScript codebases, including those built with React Native.",
    link: "https://jestjs.io/",
    icon: Jest
  }
}

export const DEPLOYMENT_TECHS = {
  vercel: {
    name: 'Vercel',
    value: 'vercel',
    description: "A platform for building and deploying web applications and websites.",
    link: "https://vercel.com/",
    icon: Vercel
  },
  firebase: {
    name: 'Firebase',
    value: 'firebase',
    description: "A platform for building and deploying web applications and websites.",
    link: "https://firebase.google.com/",
    icon: Firebase
  },
  gitlab: {
    name: 'GitLab',
    value: 'gitlab',
    description: "A platform for building and deploying web applications and websites.",
    link: "https://gitlab.com/",
    icon: Gitlab
  },
  github: {
    name: 'Github',
    value: 'github',
    description: "A platform for building and deploying web applications and websites.",
    link: "https://github.com/",
    icon: GithubBig
  },
  git: {
    name: 'Git',
    value: 'git',
    description: "A distributed version-control system for tracking changes in source code during software development.",
    link: "https://git-scm.com/",
    icon: Git
  }
}

export const CATEGORIES = [
  {
    label: 'Essentials for Web App Development',
    value: 'basics',
    techs: [
      BASICS_TECHS.react,
      BASICS_TECHS.nextjs,
      BASICS_TECHS.turborepo,
      BASICS_TECHS.typescript,
      BASICS_TECHS.javascript,
      BASICS_TECHS.claudecode,
      BASICS_TECHS.copilot,
      BASICS_TECHS.html,
      BASICS_TECHS.css,
      BASICS_TECHS.node,
      BASICS_TECHS.express,
    ]
  },
  {
    label: 'Styling and Related Libraries',
    value: 'styling',
    techs: [
      STYLING_TECHS.tailwind,
      STYLING_TECHS.sass,
      STYLING_TECHS.styledcomponents,
      STYLING_TECHS.emotioncss,
      STYLING_TECHS.bootstrap,
      STYLING_TECHS.shadcnui,
    ]
  },
  {
    label: 'Design and UX/UI tools',
    value: 'design',
    techs: [
      DESIGN_TECHS.figma,
      DESIGN_TECHS.ps,
      DESIGN_TECHS.ai,
      DESIGN_TECHS.corel,
      DESIGN_TECHS.rhinoceros,
      DESIGN_TECHS.vray,
      DESIGN_TECHS.autodeskMax,
      DESIGN_TECHS.solidworks,
    ]
  },
  {
    label: 'Database Management',
    value: 'db',
    techs: [
      DB_TECHS.sql,
      DB_TECHS.postgresql,
      DB_TECHS.mysql,
      DB_TECHS.prisma,
    ]
  },
  {
    label: 'Testing and QA',
    value: 'testing',
    techs: [
      TESTING_TECHS.playwright,
      TESTING_TECHS.ladle,
      TESTING_TECHS.storybook,
      TESTING_TECHS.jest,
    ]
  },
  {
    label: 'Version Control and Deployment',
    value: 'deployment',
    techs: [
      DEPLOYMENT_TECHS.vercel,
      DEPLOYMENT_TECHS.firebase,
      DEPLOYMENT_TECHS.gitlab,
      DEPLOYMENT_TECHS.github,
      DEPLOYMENT_TECHS.git,
    ]
  }
]
