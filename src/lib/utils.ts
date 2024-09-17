import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Just for development purposes
export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}