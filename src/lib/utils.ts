import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { CLOUDINARY_FILE_URL, CLOUDINARY_IMAGE_URL, GOOGLE_DRIVE_FILE_URL, GOOGLE_DRIVE_IMAGE_URL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export const getImageUrlPlaceholder = (): string => {
  return `${GOOGLE_DRIVE_IMAGE_URL} or ${CLOUDINARY_IMAGE_URL}`;
};

export const getFileUrlPlaceholder = (): string => {
  return `${GOOGLE_DRIVE_FILE_URL} or ${CLOUDINARY_FILE_URL}`;
};
