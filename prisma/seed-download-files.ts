import { Prisma } from "../src/generated/prisma/client.js";


export const CV_EN_SEED: Prisma.DownloadCreateInput = {
  name: "Curriculum Vitae",
  description: "Download my CV to view my experience and technical skills.",
  language: "en",
  fileHref:
    "https://drive.google.com/file/d/1HDbeTcBe0HQvwQIjPbqkWDtUcvnBaHC5/view?usp=sharing",
  format: "pdf",
  imageUrl:
    "https://drive.google.com/uc?export=view&id=1G2GI_0xFul8Q5BWFMzGQQa9uxulTFWN8",
  alt: "Download Curriculum Vitae background",
  isActive: true,
};

export const CV_ES_SEED: Prisma.DownloadCreateInput = {
  name: "Curriculum Vitae",
  description: "Descarga mi CV para más información sobre mi experiencia y habilidades técnicas.",
  language: "es",
  fileHref:
    "https://drive.google.com/file/d/1pz0vINFhrpiYfHfz3M09pCtPLMiAocQq/view?usp=sharing",
  format: "pdf",
  imageUrl:
    "https://drive.google.com/uc?export=view&id=1G2GI_0xFul8Q5BWFMzGQQa9uxulTFWN8",
  alt: "Download Curriculum Vitae background",
  isActive: true,
};

export const PORTFOLIO_EN_SEED = {
  name: "Portfolio",
  description: "Portfolio featuring my best projects.",
  language: "en",
  fileHref:
    "https://drive.google.com/file/d/1AyxWpCRJNua3MQX9CHRxbscEPcAsqGzI/view?usp=sharing",
  format: "pdf",
  imageUrl:
    "https://drive.google.com/uc?export=view&id=14_nyeEJF3As0lPMk3GCaY0uONRIOF1QN",
  alt: "Download Portfolio background",
  isActive: true,
};
