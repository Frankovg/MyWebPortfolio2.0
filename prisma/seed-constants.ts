// Versión simplificada de constants.ts para el script de seed

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

const getDefaultTechStack = () => {
  return TECH_STACK_DATA.map((tech) => ({
    label: tech.name,
    value: tech.value,
  }));
};

export const DEFAULT_TECH_STACK = getDefaultTechStack();
