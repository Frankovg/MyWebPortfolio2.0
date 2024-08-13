
// logos
import LinkedIn from "../icons/linkedIn"
import Github from "../icons/github"

import tailIcon from "../../../../public/images/tailwind.svg"
import sassIcon from "../../../../public/images/sass.svg"
import styledIcon from "../../../../public/images/css.svg"
import emotionIcon from "../../../../public/images/css.svg"
import shadcnIcon from "../../../../public/images/css.svg"
import bootIcon from "../../../../public/images/css.svg"

import figmaIcon from "../../../../public/images/figma.svg"
import aiIcon from "../../../../public/images/ai.svg"
import psIcon from "../../../../public/images/ps.svg"

import sqlIcon from "../../../../public/images/sql.svg"
import mysqlIcon from "../../../../public/images/sql.svg"
import postgreIcon from "../../../../public/images/sql.svg"
import prismaIcon from "../../../../public/images/sql.svg"

import playIcon from "../../../../public/images/sql.svg"
import storyIcon from "../../../../public/images/sql.svg"
import ladleIcon from "../../../../public/images/sql.svg"

import gitIcon from "../../../../public/images/git.svg"
import githubIcon from "../../../../public/images/github.svg"
import gitlabIcon from "../../../../public/images/gitlab.svg"
import verselIcon from "../../../../public/images/gitlab.svg"
import fireIcon from "../../../../public/images/gitlab.svg"

export const ROUTES = [
  {
    label: 'Home',
    path: '/#home'
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
    label: 'Essential for Web App Development',
    value: 'basics',
    techs: [
      { name: 'React', value: 'react', icon: "./images/react.svg" },
      { name: 'Next.js', value: 'nextjs', icon: "./images/nextjs.svg" },
      { name: 'Turborepo', value: 'turbo', icon: "./images/turborepo.svg" },
      { name: 'Typescript', value: 'ts', icon: "./images/ts.svg" },
      { name: 'JavaScript', value: 'js', icon: "./images/js.svg" },
      { name: 'HTML', value: 'html', icon: "./images/html.svg" },
      { name: 'CSS', value: 'css', icon: "./images/css.svg" },
      { name: 'Node.js', value: 'node', icon: "./images/node.svg" },
      { name: 'Express', value: 'express', icon: "./images/express.svg" },
    ]
  },
  {
    label: 'Styling and Related Libraries',
    value: 'styling',
    techs: [
      { name: 'Tailwind', value: 'tailwind', icon: "./images/tailwind.svg" },
      { name: 'Sass', value: 'sass', icon: "./images/sass.svg" },
      { name: 'Styled Components', value: 'styled', icon: "./images/react.svg" },
      { name: 'Emotion', value: 'emotion', icon: "./images/react.svg" },
      { name: 'Bootstrap', value: 'bootstrap', icon: "./images/react.svg" },
      { name: 'Shadcn/ui', value: 'shadcn', icon: "./images/react.svg" },
    ]
  },
  {
    label: 'Design and UX/UI tools',
    value: 'design',
    techs: [
      { name: 'Figma', value: 'figma', icon: "./images/figma.svg" },
      { name: 'Adobe Photoshop', value: 'ps', icon: "./images/ps.svg" },
      { name: 'Adobe Illustrator', value: 'ai', icon: "./images/ai.svg" },
    ]
  },
  {
    label: 'Database Management',
    value: 'db',
    techs: [
      { name: 'SQL', value: 'sql', icon: "./images/sql.svg" },
      { name: 'PostgreSQL', value: 'postgres', icon: "./images/react.svg" },
      { name: 'MySQL', value: 'mysql', icon: "./images/react.svg" },
      { name: 'Prisma', value: 'prisma', icon: "./images/react.svg" },
    ]
  },
  {
    label: 'Testing and QA',
    value: 'testing',
    techs: [
      { name: 'Playwright', value: 'play', icon: "./images/react.svg" },
      { name: 'Ladle', value: 'ladle', icon: "./images/react.svg" },
      { name: 'Storybook', value: 'storybook', icon: "./images/react.svg" },
    ]
  },
  {
    label: 'Version Control and Deployment',
    value: 'deployment',
    techs: [
      { name: 'Git', value: 'git', icon: "./images/git.svg" },
      { name: 'Github', value: 'github', icon: "./images/github_big.svg" },
      { name: 'Gitlab', value: 'gitlab', icon: "./images/gitlab.svg" },
      { name: 'Vercel', value: 'vercel', icon: "./images/react.svg" },
      { name: 'Firebase', value: 'firebase', icon: "./images/react.svg" },
    ]
  }
]