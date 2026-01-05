import {
  BASICS_TECHS,
  DB_TECHS,
  DEPLOYMENT_TECHS,
  DESIGN_TECHS,
  STYLING_TECHS,
  TESTING_TECHS,
} from "@/app/(app)/home/constants/constants";
import { GithubIcon, LinkedInIcon } from "@/icons/social";
import img1 from "@/public/images/in-profile-1.webp";
import img2 from "@/public/images/in-profile-2.webp";
import img3 from "@/public/images/in-profile-3.webp";
import img4 from "@/public/images/in-profile-4.webp";
import img5 from "@/public/images/in-profile-5.webp";

// Navbar links
export const ROUTES = [
  {
    label: "Home",
    path: "home",
  },
  {
    label: "Tech stack",
    path: "tech-stack",
  },
  {
    label: "Projects",
    path: "projects",
  },
  {
    label: "About me",
    path: "about-me",
  },
];

// Navbar social links
export const SOCIAL_ICONS = [
  {
    name: "LinkedIn",
    value: "linkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    alt: "LinkedIn icon",
    icon: LinkedInIcon,
  },
  {
    name: "Github",
    value: "gitHub",
    href: process.env.NEXT_PUBLIC_GITHUB_URL,
    alt: "Github icon",
    icon: GithubIcon,
  },
];

// LinkedIn referrals
export const REFERRALS = [
  {
    id: 1,
    img: img1,
    name: "Jazmin Feige",
    role: "Visual Merchandising Senior Manager at EssilorLuxottica",
    text: "Franco is an excellent professional. We worked together as a team for several years in a very smooth and efficient manner. We always communicated quickly and effectively, and his contributions had a significant impact on the projects we worked on together. We formed a team where the priority was to achieve the best results through a very creative, organized, and high-quality approach.",
  },
  {
    id: 2,
    img: img2,
    name: "Mariana Swidzinski",
    role: "Creative Project Manager at EcoFold",
    text: "I worked with Franco on several occasions, the first time on the same team, with me as the designer and him in charge of prototyping. Professionally, I highlight the speed and commitment with which he handles himself during busy times and his attention to detail. He offers improvement suggestions when necessary and doesn't hesitate to share his knowledge. On a personal level, he has an excellent attitude, always positive and collaborative. I would work with him again—highly recommended!",
  },
  {
    id: 3,
    img: img3,
    name: "Gustavo Anelli",
    role: "Industrial Designer at Zedis",
    text: "Franco is an excellent person and designer. I had the opportunity to see him work particularly in the development area, creating technical drawings for production, where he demonstrated his ability to work very well under pressure, handling a large volume of tasks with extremely tight deadlines. He stands out for his responsibility, efficiency, and speed. His high level of commitment and dedication is evident in the details of his presentations.",
  },
  {
    id: 4,
    img: img4,
    name: "Pablo Daniel Pellizzoni",
    role: "Head of department at Grupo Developer",
    text: "Not only a great person, but also a great colleague and designer, and he has been an excellent student. Always showing the proactivity needed and seeking new horizons! Wishing you success in this new chapter, and you're missed here in Argentina. Great designer!",
  },
  {
    id: 5,
    img: img5,
    name: "Patricio Gustavo Mariano",
    role: "Associate Founder at Malawebs",
    text: "I have had the privilege of knowing Franco since our time at industrial design university, and over the years, we have maintained a professional relationship and friendship that I deeply value. We have collaborated on various projects, and it is always a pleasure to share ideas and experiences with him. Franco stands out not only for his professionalism and commitment but also for his efficiency and remarkable ability to learn new tools.",
  },
];

// Footer links
export const FOOTER_LINKS = {
  sections: [
    {
      name: "About Me",
      href: "about-me",
    },
    {
      name: "Admin",
      href: "/admin",
    },
    {
      name: "Home",
      href: "/",
    },
  ],
  letsTalk: [
    {
      name: "Contact",
      href: "contact",
    },
    {
      name: "LinkedIn",
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    },
  ],
  legals: [
    {
      name: "Cookies Policy",
      href: "/cookies-policy"
    },
    {
      name: "Privacy Policy",
      href: "/privacy-policy"
    },
  ]
};

export const FALLBACK_IMG = "/images/project-placeholder.webp";
export const PREV = "prev" as const;
export const NEXT = "next" as const;

// All technologies supported by the portfolio
export const ALL_TECHS = Object.values({
  ...BASICS_TECHS,
  ...STYLING_TECHS,
  ...DESIGN_TECHS,
  ...DB_TECHS,
  ...TESTING_TECHS,
  ...DEPLOYMENT_TECHS,
});

export const DATE_FORMAT = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
} as const;

export const DATE_LOCATION = "es-ES";

//Forms constants
export const GOOGLE_DRIVE_IMAGE_URL = "https://drive.google.com/uc?export=view&id=";
export const CLOUDINARY_IMAGE_URL = "https://res.cloudinary.com/webportfolio/image/upload/";
export const DEFAULT_FILE_URL = "https://drive.google.com/file/d/";

// Supported image URL prefixes
export const IMAGE_URL_PREFIXES = [GOOGLE_DRIVE_IMAGE_URL, CLOUDINARY_IMAGE_URL] as const;

/**
 * Check if a URL is a valid image URL from supported providers (Google Drive or Cloudinary)
 */
export const isValidImageUrl = (url: string | undefined | null): boolean => {
  if (!url) return false;
  return IMAGE_URL_PREFIXES.some(prefix => url.startsWith(prefix) && url.length > prefix.length);
};

/**
 * Get the placeholder text for image URL inputs
 */
export const getImageUrlPlaceholder = (): string => {
  return `${GOOGLE_DRIVE_IMAGE_URL} or ${CLOUDINARY_IMAGE_URL}`;
};

// Legacy export for backwards compatibility during migration
export const DEFAULT_IMAGE_URL = GOOGLE_DRIVE_IMAGE_URL;

export const TECH_STACK_DATA = [
  { name: "React", value: "react" },
  { name: "Next.js", value: "nextjs" },
  { name: "Typescript", value: "typescript" },
  { name: "Tailwind", value: "tailwind" },
  { name: "Node.js", value: "node" },
  { name: "Prisma", value: "prisma" },
  { name: "PostgreSQL", value: "postgresql" },
  { name: "JavaScript", value: "javascript" },
  { name: "Bootstrap", value: "bootstrap" },
  { name: "Firebase", value: "firebase" },
  { name: "MySQL", value: "mysql" },
  { name: "Express", value: "express" },
  { name: "Storybook", value: "storybook" },
  { name: "Styled Components", value: "styledcomponents" },
  { name: "Emotion", value: "emotioncss" },
  { name: "Ladle", value: "ladle" },
  { name: "Playwright", value: "playwright" },
  { name: "Figma", value: "figma" },
  { name: "Adobe Photoshop", value: "ps" },
  { name: "Adobe Illustrator", value: "ai" },
  { name: "Git", value: "git" },
  { name: "Gitlab", value: "gitlab" },
  { name: "Github", value: "github" },
  { name: "SQL", value: "sql" },
  { name: "Shadcn/ui", value: "shadcnui" },
  { name: "Sass", value: "sass" },
  { name: "CSS", value: "css" },
  { name: "HTML", value: "html" },
  { name: "Turborepo", value: "turborepo" },
  { name: "Vercel", value: "vercel" },

];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getDefaultTechStack = () => {
  return TECH_STACK_DATA.map((tech) => ({
    label: tech.name,
    value: tech.value,
  }));
};
export const DEFAULT_TECH_STACK = getDefaultTechStack();

export const LANGUAGE_DICTIONARY = {
  en: "English",
  es: "Spanish",
};

export const ACCOUNT_REQUEST_MESSAGE = "Hello,\n\nI would like to request access to a demo account to explore the platform and its features.\n\nThank you,\nBest regards"
